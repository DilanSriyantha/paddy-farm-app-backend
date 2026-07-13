import { Injectable, Logger, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Notification, TextContents } from 'src/constants/constants';
import { PrismaPromise } from 'src/generated/prisma/internal/prismaNamespace';
import { CultivationCreateInput, CultivationModel, CultivationUpdateInput } from 'src/generated/prisma/models';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CultivationsService {
    private readonly logger = new Logger(CultivationsService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService,
        private readonly notificationsService: NotificationsService,
    ) { }

    async findAll(email: string): Promise<CultivationModel[]> {
        const user = await this.usersService.findOneByEmail(email);

        return this.prisma.cultivation.findMany({
            where: { userId: user.id }
        });
    }

    async findOneById(id: number): Promise<CultivationModel | null> {
        const cultivation = await this.prisma.cultivation.findFirst({
            where: { id }
        });

        if (!cultivation) throw new NotFoundException(`Cultivation with ID ${id} not found`);

        return cultivation;
    }

    async findActiveSessions(): Promise<CultivationModel[]> {
        return this.prisma.cultivation.findMany({
            where: { status: "ACTIVE" }
        });
    }

    async findLatestActiveSession(): Promise<CultivationModel | null> {
        return this.prisma.cultivation.findFirst({
            where: { status: "ACTIVE" }
        });
    }

    async createOne(email: string, body: CultivationCreateInput): Promise<CultivationModel> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) throw new NotFoundException("User not found");

        const activeSessions = await this.findActiveSessions();
        if (activeSessions.length > 0) throw new NotAcceptableException("An active cultivation session is detected. You cannot create another cultivation session until the current session is completed.");

        const parsedDate = new Date(body.startDate);

        const cultivation = await this.prisma.cultivation.create({
            data: {
                startDate: parsedDate,
                seedType: body.seedType,
                sizeInAcres: body.sizeInAcres,
                paddyVariety: body.paddyVariety,
                userId: user.id
            }
        });

        const language = user.preferredLanguage === "ENGLISH" ? "en" : "si";
        const notification = TextContents[language].notifications.stages.germination;
        await this.notificationsService.createOne({
            title: notification.title,
            content: notification.message,
            userId: user.id,
        });

        return cultivation;
    }

    async updateOne(id: number, body: CultivationUpdateInput): Promise<CultivationModel> {
        await this.findOneById(id);

        let parsedDate: Date | undefined = undefined;
        if (body.startDate !== null && body.startDate !== undefined)
            parsedDate = new Date(body.startDate as any);

        return this.prisma.cultivation.update({
            data: {
                startDate: parsedDate,
                seedType: body.seedType,
                sizeInAcres: body.sizeInAcres,
                paddyVariety: body.paddyVariety,
            },
            where: { id }
        });
    }

    async deleteOne(id: number): Promise<CultivationModel> {
        await this.findOneById(id);

        return this.prisma.cultivation.delete({
            where: { id }
        });
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCultivationStageUpdates() {
        this.logger.log("Running daily cultivation stage checks...");

        const stageKeys: Record<number, string> = {
            15: 'seedling_early_vegetative',
            31: 'tillering',
            51: 'panicle_initiation',
            66: 'booting_heading',
            81: 'flowering',
            96: 'grain_filling_ripening',
            111: 'harvest',
            121: 'completed'
        };

        try {
            const activeCultivations = await this.prisma.cultivation.findMany({
                where: { status: "ACTIVE" },
                include: { user: true }
            });

            for (const cultivation of activeCultivations) {
                const daysGone = this.getDaysGone(cultivation);
                const stageKey = stageKeys[daysGone];

                if (!stageKey) continue;

                const language = cultivation.user.preferredLanguage === "ENGLISH" ? "en" : "si"
                let notification: Notification = TextContents[language].notifications.stages[stageKey];

                if (!notification) continue;

                const queries: PrismaPromise<any>[] = [];

                if (stageKey === stageKeys[121]) {
                    const completeCurrentSession = this.prisma.cultivation.update({
                        data: { status: "COMPLETED" },
                        where: { id: cultivation.id }
                    });
                    queries.push(completeCurrentSession);
                }

                const createNotification = this.prisma.notification.create({
                    data: {
                        title: notification.title,
                        content: notification.message,
                        userId: cultivation.userId,
                    }
                });
                queries.push(createNotification);

                await this.prisma.$transaction(queries);

                this.logger.log(`Triggered notification for User ${cultivation.userId} on cultivation ID ${cultivation.id}`);
            }
        } catch (err) {
            this.logger.error("Error processing cultivation stages", err instanceof Error ? err.stack : "An unknown error.");
        }
    }

    private getDaysGone(cultivation: CultivationModel): number {
        const startDate = new Date(cultivation.startDate);
        const today = new Date();

        startDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffInMillis = today.getTime() - startDate.getTime();
        const daysGone = diffInMillis / (1000 * 60 * 60 * 24);

        return Math.floor(daysGone);
    }
}
