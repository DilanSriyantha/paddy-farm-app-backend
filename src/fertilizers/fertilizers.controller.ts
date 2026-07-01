import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query, UploadedFile } from '@nestjs/common';
import { UseLocalImageUpload } from 'src/common/interceptors/local-image-upload.interceptor';
import { FertilizersService } from './fertilizers.service';
import { FertilizerModel } from 'src/generated/prisma/models';

@Controller('api/v1/fertilizers')
export class FertilizersController {
    constructor(
        private readonly fertilizersService: FertilizersService
    ) { }

    @Get("/findAll")
    async findAll(): Promise<FertilizerModel[]> {
        return this.fertilizersService.findAll();
    }

    @Get("/findOneById")
    async findOneById(
        @Query("id", ParseIntPipe) id: number,
    ): Promise<FertilizerModel> {
        return this.fertilizersService.findOneById(id);
    }

    @Post("/create")
    @UseLocalImageUpload("image", "fertilizers")
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: { name: string, pricePerKg: string }
    ): Promise<FertilizerModel> {
        return this.fertilizersService.createOne(file, body);
    }

    @Put("/update")
    @UseLocalImageUpload("image", "fertilizers")
    async update(
        @Query("id", ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() body?: { name?: string, pricePerKg?: string }
    ): Promise<FertilizerModel> {
        return this.fertilizersService.updateOne(id, file, body);
    }

    @Delete("/delete")
    async deleteOne(
        @Query("id", ParseIntPipe) id: number,
    ): Promise<FertilizerModel> {
        return this.fertilizersService.deleteOne(id);
    }
}
