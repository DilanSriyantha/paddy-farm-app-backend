import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { CultivationsModule } from 'src/cultivations/cultivations.module';

@Module({
  providers: [RecommendationsService],
  controllers: [RecommendationsController],
  imports: [CultivationsModule],
  exports: [RecommendationsService],
})
export class RecommendationsModule { }
