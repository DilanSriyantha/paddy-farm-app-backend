import { Injectable, NotFoundException } from '@nestjs/common';
import EventEmitter from 'events';
import { Observable } from 'rxjs';
import { NotificationModel } from 'src/generated/prisma/models';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationCreateDto, NotificationUpdateDto } from './types';

@Injectable()
export class NotificationsService {
    private readonly emitter = new EventEmitter();
    private readonly NOTIFICATION_EVENT = "new_notification";

    constructor(
        private readonly prisma: PrismaService
    ) {
        this.emitter.setMaxListeners(100);
    }

    async findAll(): Promise<NotificationModel[]> {
        return this.prisma.notification.findMany();
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
}
