import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import path from 'path';

@Injectable()
export class DiseasePredictionService {
    async predict(imagePath: string) {
        const url = `${process.env.PREDICTION_SERVICE_URL ?? "http://127.0.0.1:8000/api/v1"}/predict`;

        const absoluteImagePath = path.resolve(imagePath);

        const payload = { image_path: absoluteImagePath };

        const predictionApiKey = process.env.PREDICTION_API_KEY;
        console.log(predictionApiKey);

        try {
            const { data } = await axios.post(
                url,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Prediction-API-Key": `${predictionApiKey}`
                    },
                    timeout: 50000,
                }
            );

            return data;
        } catch (err) {
            console.error("FastAPI Error Detail: ", JSON.stringify((err as any).response?.data, null, 2));

            throw new InternalServerErrorException("Prediction service unavailable.");
        }
    }
}
