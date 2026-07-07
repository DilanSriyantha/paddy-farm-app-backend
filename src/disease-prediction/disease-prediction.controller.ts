import { Controller, Post, UploadedFile } from '@nestjs/common';
import { UseLocalImageUpload } from 'src/common/interceptors/local-image-upload.interceptor';
import { DiseasePredictionService } from './disease-prediction.service';

@Controller('api/v1/disease-prediction')
export class DiseasePredictionController {

    constructor(
        private readonly diseasePredictionService: DiseasePredictionService
    ) { }

    @Post("/predict")
    @UseLocalImageUpload("image", "predictions")
    async predict(
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.diseasePredictionService.predict(file.path);
    }
}
