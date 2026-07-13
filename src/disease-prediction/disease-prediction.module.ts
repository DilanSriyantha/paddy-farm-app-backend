import { Module } from '@nestjs/common';
import { DiseasePredictionService } from './disease-prediction.service';
import { DiseasePredictionController } from './disease-prediction.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [DiseasePredictionService],
  controllers: [DiseasePredictionController],
  imports: [UsersModule],
})
export class DiseasePredictionModule { }
