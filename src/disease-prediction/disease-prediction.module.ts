import { Module } from '@nestjs/common';
import { DiseasePredictionService } from './disease-prediction.service';
import { DiseasePredictionController } from './disease-prediction.controller';

@Module({
  providers: [DiseasePredictionService],
  controllers: [DiseasePredictionController]
})
export class DiseasePredictionModule {}
