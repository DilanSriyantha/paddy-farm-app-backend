import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [NotificationsService],
  controllers: [NotificationsController],
  imports: [UsersModule],
  exports: [NotificationsService],
})
export class NotificationsModule { }
