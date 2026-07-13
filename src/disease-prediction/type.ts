import { DiseaseDetectionResultCreateInput } from "src/generated/prisma/models";

export interface RawDiseaseDetectionResult {
    success: boolean;
    imagePath: string;
    disease: string;
    confidence: number;
    rawPredictions: Record<string, number>;
};

export interface DiseaseDetectionResultCreateRequest extends Pick<DiseaseDetectionResultCreateInput, "disease" | "diseaseScientificName" | "riskLevel"> {
    imagePath: string;
};

export type DiseaseDetectionResultUpdateRequest = Omit<DiseaseDetectionResultCreateInput, "imagePath">;