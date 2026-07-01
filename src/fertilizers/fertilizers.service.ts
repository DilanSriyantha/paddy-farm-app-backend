import { Injectable, NotFoundException } from '@nestjs/common';
import { FertilizerModel } from 'src/generated/prisma/models';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FertilizersService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async findAll(): Promise<FertilizerModel[]> {
        return this.prisma.fertilizer.findMany();
    }

    async findOneById(id: number): Promise<FertilizerModel> {
        const fertilizer = await this.prisma.fertilizer.findFirst({
            where: { id }
        });
        if (!fertilizer) throw new NotFoundException("Fertilizer not found");

        return fertilizer;
    }

    async createOne(file: Express.Multer.File, body: { name: string, pricePerKg: string }): Promise<FertilizerModel> {
        const pricePerKg = Number(body.pricePerKg);
        const imgPath = file.path.replace("uploads", "public").replaceAll("\\", "/");
        const newFertilizer = await this.prisma.fertilizer.create({
            data: {
                name: body.name,
                pricePerKg,
                imgPath,
            }
        });

        return newFertilizer;
    }

    async updateOne(id: number, file?: Express.Multer.File, body?: { name?: string, pricePerKg?: string }): Promise<FertilizerModel> {
        await this.findOneById(id);

        const pricePerKg = Number(body?.pricePerKg);
        const imgPath = file?.path.replace("uploads", "public").replaceAll("\\", "/");
        const updatedFertilizer = await this.prisma.fertilizer.update({
            data: {
                name: body?.name,
                pricePerKg,
                imgPath,
            },
            where: { id }
        });

        return updatedFertilizer;
    }

    async deleteOne(id: number): Promise<FertilizerModel> {
        await this.findOneById(id);

        return this.prisma.fertilizer.delete({
            where: { id },
        });
    }
}
