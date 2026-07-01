import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CultivationCreateInput, CultivationModel, CultivationUpdateInput } from 'src/generated/prisma/models';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CultivationsService {
    constructor(
        private prisma: PrismaService,
        private usersService: UsersService
    ) { }

    async findAll(): Promise<CultivationModel[]> {
        return this.prisma.cultivation.findMany();
    }

    async findOneById(id: number): Promise<CultivationModel | null> {
        const cultivation = this.prisma.cultivation.findFirst({
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

        const cultivation = this.prisma.cultivation.create({
            data: {
                startDate: parsedDate,
                seedType: body.seedType,
                sizeInAcres: body.sizeInAcres,
                paddyVariety: body.paddyVariety,
                userId: user.id
            }
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
}
