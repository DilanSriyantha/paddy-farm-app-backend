import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Prisma } from 'src/generated/prisma/client';
import type { Request } from 'express';

@Controller('api/v1/users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @Get('/profile')
    getProfile(@Req() req: Request) {
        if (!req["user"]) throw new UnauthorizedException();
        return this.usersService.findOneByEmail(req["user"].email);
    }

    @Get('/findAll')
    findAll() {
        return this.usersService.findAll();
    }

    @Public()
    @Get('/findOneById')
    findOneById(@Query('id', ParseIntPipe) id: number) {
        return this.usersService.findOneById(id);
    }

    @Get('/findOneByEmail')
    findOneByEmail(@Query('email') email: string) {
        return this.usersService.findOneByEmail(email);
    }

    @Post('/createOne')
    createOne(@Body() createUserDto: Prisma.UserCreateInput) {
        return this.usersService.createOne(createUserDto);
    }

    @Put('/updateOne')
    updateOne(
        @Query('id', ParseIntPipe) id: number,
        @Body() updateUserDto: Prisma.UserUpdateInput
    ) {
        return this.usersService.updateOne(id, updateUserDto);
    }

    @Delete('/deleteOne')
    deleteOne(@Query('id', ParseIntPipe) id: number) {
        return this.usersService.deleteOne(id);
    }
}
