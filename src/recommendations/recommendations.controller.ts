import { Controller, Get, Query } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';

@Controller('api/v1/recommendations')
export class RecommendationsController {
    constructor(
        private recommendationsService: RecommendationsService
    ) { }

    @Get("/getRecommendationsForCurrentSession")
    async getRecommendationsForCurrentSession(@Query("language") language: "en" | "si") {
        return this.recommendationsService.getRecommendations(language);
    }
}
