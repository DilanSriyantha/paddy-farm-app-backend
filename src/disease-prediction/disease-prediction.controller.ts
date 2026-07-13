import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query, Req, UploadedFile } from '@nestjs/common';
import { UseLocalImageUpload } from 'src/common/interceptors/local-image-upload.interceptor';
import { DiseasePredictionService } from './disease-prediction.service';
import { DiseaseDetectionResultModel } from 'src/generated/prisma/models';
import type { DiseaseDetectionResultCreateRequest, DiseaseDetectionResultUpdateRequest } from './type';

@Controller('api/v1/disease-prediction')
export class DiseasePredictionController {

    constructor(
        private readonly diseasePredictionService: DiseasePredictionService
    ) { }

    @Get("/findAll")
    async findAll(
        @Req() req: Request
    ): Promise<DiseaseDetectionResultModel[]> {
        const user = req["user"];

        if (user)
            return this.diseasePredictionService.findAllByUser(user["email"]);
        return this.diseasePredictionService.findAll();
    }

    @Get("/findLatestResult")
    async findLatestResult(
        @Req() req: Request
    ): Promise<DiseaseDetectionResultModel> {
        const user = req["user"];
        return this.diseasePredictionService.findLatestResult(user["email"]);
    }

    @Get("/findOneById")
    async findOneById(
        @Query("id") id: string
    ): Promise<DiseaseDetectionResultModel> {
        return this.diseasePredictionService.findOneById(id);
    }

    @Post("/create")
    async createOne(
        @Req() req: Request,
        @Body() data: DiseaseDetectionResultCreateRequest
    ): Promise<DiseaseDetectionResultModel> {
        const user = req["user"];
        return this.diseasePredictionService.createOne(user["email"], data);
    }

    @Post("/predict")
    @UseLocalImageUpload("image", "predictions")
    async predict(
        @Req() req: Request,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<DiseaseDetectionResultModel> {
        const user = req["user"];
        return this.diseasePredictionService.predict(user["email"], file.path);
    }

    @Put("/update")
    async updateOne(
        @Query("id") id: string,
        @Body() data: DiseaseDetectionResultUpdateRequest,
    ): Promise<DiseaseDetectionResultModel> {
        return this.diseasePredictionService.updateOne(id, data);
    }

    @Delete("/delete")
    async deleteOne(
        @Query("id") id: string
    ): Promise<DiseaseDetectionResultModel> {
        return this.diseasePredictionService.deleteOne(id);
    }
}
