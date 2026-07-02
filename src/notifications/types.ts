import { NotificationModel } from "src/generated/prisma/models";

export type NotificationCreateDto = Pick<NotificationModel, "title" | "content" | "userId">;
export type NotificationUpdateDto = Pick<NotificationModel, "title" | "content" | "status">;