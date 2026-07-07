import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import EventEmitter from 'events';
import { Observable } from 'rxjs';
import { NotificationModel } from 'src/generated/prisma/models';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationCreateDto, NotificationUpdateDto } from './types';
import { UsersService } from 'src/users/users.service';
import { NotificationStatus } from 'src/generated/prisma/enums';
import { BatchPayload } from 'src/generated/prisma/internal/prismaNamespace';

@Injectable()
export class NotificationsService {
    private readonly emitter = new EventEmitter();
    private readonly NOTIFICATION_EVENT = "new_notification";

    constructor(
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService,
    ) {
        this.emitter.setMaxListeners(100);
    }

    async findAll(email: string): Promise<NotificationModel[]> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) throw new InternalServerErrorException("Failed to filter notifications by user.");

        return this.prisma.notification.findMany({
            where: {
                userId: user.id
            }
        });
    }

    async findAllByUser(userId: number): Promise<NotificationModel[]> {
        return this.prisma.notification.findMany({
            where: { userId }
        });
    }

    async findOneById(id: number): Promise<NotificationModel> {
        const notification = await this.prisma.notification.findFirst({
            where: { id }
        });

        if (!notification) throw new NotFoundException(`Notification with ID ${id} not found`);

        return notification;
    }

    async createOne(body: NotificationCreateDto): Promise<NotificationModel> {
        const notification = await this.prisma.notification.create({
            data: {
                title: body.title,
                content: body.content,
                userId: body.userId
            }
        });

        this.emitter.emit(this.NOTIFICATION_EVENT, notification);

        return notification;
    }

    async updateOne(id: number, body: NotificationUpdateDto): Promise<NotificationModel> {
        await this.findOneById(id);

        return this.prisma.notification.update({
            data: {
                title: body.title,
                content: body.content,
                status: body.status
            },
            where: { id }
        });
    }

    async markAsRead(email: string): Promise<BatchPayload> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) throw new InternalServerErrorException("Failed to mark relevant notifications as read.");

        return await this.prisma.notification.updateMany({
            data: {
                status: NotificationStatus.READ
            },
            where: {
                userId: user.id,
                status: NotificationStatus.NOT_READ
            }
        });
    }

    async deleteOne(id: number) {
        await this.findOneById(id);

        return this.prisma.notification.delete({
            where: { id }
        });
    }

    subscribeToUpdates(userId: number): Observable<NotificationModel> {
        return new Observable<NotificationModel>((subscriber) => {
            const listener = (notification: NotificationModel) => {
                if (notification.userId === userId) {
                    subscriber.next(notification);
                }
            };

            this.emitter.on(this.NOTIFICATION_EVENT, listener);

            return () => {
                this.emitter.off(this.NOTIFICATION_EVENT, listener);
            }
        });
    }

    async subscribeToUpdatesWithEmail(email: string): Promise<Observable<NotificationModel>> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) throw new InternalServerErrorException(`Failed to initiate SSE connection for the user with email ${email}`);

        return new Observable<NotificationModel>((subscriber) => {
            const listener = (notification: NotificationModel) => {
                if (notification.userId === user.id) {
                    subscriber.next(notification);
                }
            };

            this.emitter.on(this.NOTIFICATION_EVENT, listener);

            return () => {
                this.emitter.off(this.NOTIFICATION_EVENT, listener);
            }
        });
    }
}
