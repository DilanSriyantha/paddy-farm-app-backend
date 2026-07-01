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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CultivationsModule,
    RecommendationsModule,
    FertilizersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
