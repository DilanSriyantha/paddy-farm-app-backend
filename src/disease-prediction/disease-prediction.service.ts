import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import path from 'path';
import { DiseaseDetectionResultCreateRequest, DiseaseDetectionResultUpdateRequest, RawDiseaseDetectionResult } from './type';
import { DiseaseRiskLevel } from 'src/generated/prisma/enums';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiseaseDetectionResultModel } from 'src/generated/prisma/models';

@Injectable()
export class DiseasePredictionService {
    diseaseScientificNames: Record<string, string>;

    constructor(
        private readonly prismaService: PrismaService,
        private readonly usersService: UsersService,
    ) {
        this.diseaseScientificNames = {
            "Bacterial leaf blight": "Xanthomonas oryzae pv. oryzae",
            "Brown spot": "Bipolaris oryzae",
            "Leaf smut": "Entyloma oryzae"
        };
    }

    async predict(email: string, imagePath: string): Promise<DiseaseDetectionResultModel> {
        const url = `${process.env.PREDICTION_SERVICE_URL ?? "http://127.0.0.1:8000/api/v1"}/predict`;

        const absoluteImagePath = path.resolve(imagePath);

        const payload = { image_path: absoluteImagePath };

        const predictionApiKey = process.env.PREDICTION_API_KEY;

        try {
            const { data } = await axios.post(
                url,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Prediction-API-Key": `${predictionApiKey}`
                    },
                    timeout: 1000000,
                }
            );

            return this.createOne(email, this.toDiseaseDetectionResultCreateRequest({ ...data, imagePath }));
        } catch (err) {
            console.error("FastAPI Error Detail: ", JSON.stringify((err as any).response?.data, null, 2));

            throw new InternalServerErrorException("Prediction service unavailable.");
        }
    }

    async findAll(): Promise<DiseaseDetectionResultModel[]> {
        return this.prismaService.diseaseDetectionResult.findMany();
    }

    async findAllByUser(email: string): Promise<DiseaseDetectionResultModel[]> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) throw new InternalServerErrorException("Failed to filter disease detection results by user.");

        return this.prismaService.diseaseDetectionResult.findMany({
            where: { userId: user.id }
        });
    }

    async findLatestResult(email: string): Promise<DiseaseDetectionResultModel> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) throw new InternalServerErrorException("Failed to filter disease detection results by user.");

        return this.prismaService.diseaseDetectionResult.findFirstOrThrow({
            orderBy: {
                createdAt: "desc",
            }
        });
    }

    async findOneById(id: string): Promise<DiseaseDetectionResultModel> {
        const result = await this.prismaService.diseaseDetectionResult.findUnique({
            where: { id }
        });
        if (!result) throw new NotFoundException(`Disease detection result with ID: ${id} was not found`);

        return result;
    }

    async createOne(email: string, data: DiseaseDetectionResultCreateRequest): Promise<DiseaseDetectionResultModel> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) throw new InternalServerErrorException(`Failed to create a disease detection result for the user with email ${email}`);

        return this.prismaService.diseaseDetectionResult.create({
            data: {
                imagePath: data.imagePath,
                disease: data.disease,
                diseaseScientificName: data.diseaseScientificName,
                riskLevel: data.riskLevel,
                userId: user.id
            }
        });
    }

    async updateOne(id: string, data: DiseaseDetectionResultUpdateRequest): Promise<DiseaseDetectionResultModel> {
        await this.findOneById(id);

        return this.prismaService.diseaseDetectionResult.update({
            data: {
                disease: data.disease,
                riskLevel: data.riskLevel,
            },
            where: { id }
        });
    }

    async deleteOne(id: string): Promise<DiseaseDetectionResultModel> {
        await this.findOneById(id);

        return this.prismaService.diseaseDetectionResult.delete({
            where: { id }
        });
    }

    private toDiseaseDetectionResultCreateRequest(data: RawDiseaseDetectionResult): DiseaseDetectionResultCreateRequest {
        let riskLevel: DiseaseRiskLevel;
        if (data.confidence >= 0.7)
            riskLevel = DiseaseRiskLevel.HIGH;
        else if (data.confidence >= 0.4 && data.confidence < 0.7)
            riskLevel = DiseaseRiskLevel.MEDIUM;
        else
            riskLevel = DiseaseRiskLevel.LOW;

        const imagePath = data.imagePath.replace("uploads", "public").replaceAll("\\", "/");

        return {
            imagePath,
            disease: data.disease,
            diseaseScientificName: this.diseaseScientificNames[data.disease],
            riskLevel
        };
    }
}
