import { Module } from '@nestjs/common';
import { CultivationsController } from './cultivations.controller';
import { CultivationsService } from './cultivations.service';
import { UsersModule } from 'src/users/users.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  controllers: [CultivationsController],
  providers: [CultivationsService],
  imports: [
    UsersModule,
    NotificationsModule,
  ],
  exports: [CultivationsService],
})
export class CultivationsModule { }
