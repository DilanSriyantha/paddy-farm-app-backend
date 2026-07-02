import { Controller, Get, Query } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationSummary } from 'src/constants/constants';

@Controller('api/v1/recommendations')
export class RecommendationsController {
    constructor(
        private readonly recommendationsService: RecommendationsService
    ) { }

    @Get("/getRecommendationsForCurrentSession")
    async getRecommendationsForCurrentSession(
        @Query("language") language: "en" | "si"
    ): Promise<RecommendationSummary | null> {
        return this.recommendationsService.getRecommendations(language);
    }
}
