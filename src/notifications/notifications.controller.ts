import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Sse } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Public } from 'src/auth/decorators/public.decorator';
import { NotificationsService } from './notifications.service';
import type { NotificationModel } from 'src/generated/prisma/models';
import type { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { NotificationCreateDto, NotificationUpdateDto } from './types';

@Controller('api/v1/notifications')
export class NotificationsController {
    constructor(
        private readonly notificationService: NotificationsService
    ) { }

    @Public()
    @Get()
    index(
        @Res() response: Response
    ) {
        response
            .type("text/html")
            .send(readFileSync(join(`${process.cwd()}/src/notifications/index.html`)).toString());
    }

    @Get("/findAll")
    async findAll(): Promise<NotificationModel[]> {
        return this.notificationService.findAll();
    }

    @Get("/findAllByUser")
    async findAllByUser(
        @Query("userId", ParseIntPipe) userId: number
    ): Promise<NotificationModel[]> {
        return this.notificationService.findAllByUser(userId);
    }

    @Get("/findOneById")
    async findOneById(
        @Query("id", ParseIntPipe) id: number
    ): Promise<NotificationModel> {
        return this.notificationService.findOneById(id);
    }

    @Post("/create")
    async createOne(
        @Body() body: NotificationCreateDto
    ): Promise<NotificationModel> {
        return this.notificationService.createOne(body);
    }

    @Put("/update")
    async updateOne(
        @Query("id", ParseIntPipe) id: number,
        @Body() body: NotificationUpdateDto
    ): Promise<NotificationModel> {
        return this.notificationService.updateOne(id, body);
    }

    @Delete("/delete")
    async deleteOne(
        @Query("id", ParseIntPipe) id: number
    ): Promise<NotificationModel> {
        return this.notificationService.deleteOne(id);
    }

    @Public()
    @Sse("/stream/:userId")
    streamNotifications(
        @Param("userId", ParseIntPipe) userId: number
    ): Observable<MessageEvent> {
        return this.notificationService.subscribeToUpdates(userId).pipe(
            map((notification) => ({
                id: notification.id.toString(),
                type: "message",
                data: { ...notification },
                retry: 5000,
            } as unknown as MessageEvent)),
        );
    }
}
