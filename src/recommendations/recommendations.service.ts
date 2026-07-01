import { Injectable } from '@nestjs/common';
import { CultivationsService } from 'src/cultivations/cultivations.service';
import { CultivationModel } from 'src/generated/prisma/models';
import { Notification, Recommendation, RecommendationSummary, Stage, TextContents } from 'src/constants/constants';

@Injectable()
export class RecommendationsService {
    constructor(
        private cultivationsService: CultivationsService
    ) { }

    async getRecommendations(language: "en" | "si"): Promise<RecommendationSummary | null> {
        const cultivation = await this.cultivationsService.findLatestActiveSession();
        if (!cultivation) return null;

        const daysGone = this.getDaysGone(cultivation);

        const stage = this.getStage(cultivation, language);
        if (!stage) return null;

        let recommendation: Recommendation | null;

        if (stage.id === "stg-01") {
            recommendation = TextContents[language].recommendations.stages.germination;
        } else if (stage.id === "stg-02") {
            recommendation = TextContents[language].recommendations.stages.seedling_early_vegetative;
        } else if (stage.id === "stg-03") {
            recommendation = TextContents[language].recommendations.stages.tillering;
        } else if (stage.id === "stg-04") {
            recommendation = TextContents[language].recommendations.stages.panicle_initiation;
        } else if (stage.id === "stg-05") {
            recommendation = TextContents[language].recommendations.stages.booting_heading;
        } else if (stage.id === "stg-06") {
            recommendation = TextContents[language].recommendations.stages.flowering;
        } else if (stage.id === "stg-07") {
            recommendation = TextContents[language].recommendations.stages.grain_filling_ripening;
        } else if (stage.id === "stg-08") {
            recommendation = TextContents[language].recommendations.stages.harvest;
        } else {
            recommendation = null;
        }

        return {
            stage,
            recommendation,
            daysGone
        };
    }

    private getDaysGone(cultivation: CultivationModel) {
        const startDate = new Date(cultivation.startDate);
        const currentDate = new Date(Date.now());

        const diffInMillis = Math.abs(currentDate.getTime() - startDate.getTime());
        const diffInDays = diffInMillis / (1000 * 60 * 60 * 24);

        return Math.floor(diffInDays);
    }

    private getStage(cultivation: CultivationModel, language: "en" | "si"): Stage | null {
        const diffInDays = this.getDaysGone(cultivation);

        if (diffInDays >= 0 && diffInDays < 15) {
            return TextContents[language].stages.germination;
        } else if (diffInDays >= 15 && diffInDays < 31) {
            return TextContents[language].stages.seedling_early_vegetative;
        } else if (diffInDays >= 31 && diffInDays < 51) {
            return TextContents[language].stages.tillering;
        } else if (diffInDays >= 51 && diffInDays < 66) {
            return TextContents[language].stages.panicle_initiation;
        } else if (diffInDays >= 66 && diffInDays < 81) {
            return TextContents[language].stages.booting_heading;
        } else if (diffInDays >= 81 && diffInDays < 96) {
            return TextContents[language].stages.flowering;
        } else if (diffInDays >= 96 && diffInDays < 111) {
            return TextContents[language].stages.grain_filling_ripening;
        } else if (diffInDays >= 111 && diffInDays < 121) {
            return TextContents[language].stages.harvest;
        } else {
            return null;
        }
    }

    public getNotification(cultivation: CultivationModel, language: "en" | "si"): Notification | null {
        const stage = this.getStage(cultivation, language);
        if (!stage) return null;

        if (stage.id === "stg-01") {
            return TextContents[language].notifications.stages.germination;
        } else if (stage.id === "stg-02") {
            return TextContents[language].notifications.stages.seedling_early_vegetative;
        } else if (stage.id === "stg-03") {
            return TextContents[language].notifications.stages.tillering;
        } else if (stage.id === "stg-04") {
            return TextContents[language].notifications.stages.panicle_initiation;
        } else if (stage.id === "stg-05") {
            return TextContents[language].notifications.stages.booting_heading;
        } else if (stage.id === "stg-06") {
            return TextContents[language].notifications.stages.flowering;
        } else if (stage.id === "stg-07") {
            return TextContents[language].notifications.stages.grain_filling_ripening;
        } else if (stage.id === "stg-08") {
            return TextContents[language].notifications.stages.harvest;
        } else {
            return null;
        }
    }
}
