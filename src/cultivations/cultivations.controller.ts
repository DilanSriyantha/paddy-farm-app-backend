import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UnauthorizedException } from '@nestjs/common';
import { CultivationsService } from './cultivations.service';
import type { CultivationCreateInput, CultivationModel, CultivationUpdateInput } from 'src/generated/prisma/models';

@Controller('api/v1/cultivations')
export class CultivationsController {
    constructor(
        private cultivationService: CultivationsService
    ) { }

    @Get("/findAll")
    findAll(
        @Req() req: Request
    ): Promise<CultivationModel[]> {
        const user = req["user"];
        return this.cultivationService.findAll(user["email"]);
    }

    @Get("/findOneById")
    findOneById(
        @Query("id", ParseIntPipe) id: number
    ): Promise<CultivationModel | null> {
        return this.cultivationService.findOneById(id);
    }

    @Post("/create")
    createOne(
        @Req() request: Request,
        @Body() body: CultivationCreateInput
    ): Promise<CultivationModel> {
        const user = request["user"];
        if (!user) throw new UnauthorizedException();
        return this.cultivationService.createOne(user["email"], body);
    }

    @Put("/update")
    updateOne(
        @Query("id", ParseIntPipe) id: number,
        @Body() body: CultivationUpdateInput
    ): Promise<CultivationModel | null> {
        return this.cultivationService.updateOne(id, body);
    }

    @Delete("/delete")
    deleteOne(
        @Query("id", ParseIntPipe) id: number
    ): Promise<CultivationModel> {
        return this.cultivationService.deleteOne(id);
    }
}
