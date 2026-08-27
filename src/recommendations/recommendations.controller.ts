import { Controller, Get, Query, Req } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationSummary } from 'src/constants/constants';

@Controller('api/v1/recommendations')
export class RecommendationsController {
    constructor(
        private readonly recommendationsService: RecommendationsService
    ) { }

    @Get("/getRecommendationsForCurrentSession")
    async getRecommendationsForCurrentSession(
@Req req: Request,
        @Query("language") language: "en" | "si"
    ): Promise<RecommendationSummary | null> {
const user = req["user"];

        return this.recommendationsService.getRecommendations(language, user["email"]);
    }
}
