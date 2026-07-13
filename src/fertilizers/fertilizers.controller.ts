import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query, Res, UploadedFile } from '@nestjs/common';
import { UseLocalImageUpload } from 'src/common/interceptors/local-image-upload.interceptor';
import { FertilizersService } from './fertilizers.service';
import { FertilizerModel } from 'src/generated/prisma/models';
import { Public } from 'src/auth/decorators/public.decorator';
import type { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller('api/v1/fertilizers')
export class FertilizersController {
    constructor(
        private readonly fertilizersService: FertilizersService
    ) { }

    @Public()
    @Get("/")
    async index(
        @Res() response: Response
    ) {
        response
            .type("text/html")
            .send(readFileSync(join(`${process.cwd()}/src/fertilizers/index.html`)).toString());
    }

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

    @Public()
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
