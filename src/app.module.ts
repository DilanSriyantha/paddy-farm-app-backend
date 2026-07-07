import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CultivationsModule } from './cultivations/cultivations.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { FertilizersModule } from './fertilizers/fertilizers.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DiseasePredictionModule } from './disease-prediction/disease-prediction.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    HttpModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    CultivationsModule,
    RecommendationsModule,
    FertilizersModule,
    NotificationsModule,
    DiseasePredictionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
