import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import type { Request } from 'express';
import type { UserCreateInput, UserModel, UserUpdateInput } from 'src/generated/prisma/models';

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

    @Public()
    @Get('/findAll')
    findAll() {
        return this.usersService.findAll();
    }

    @Public()
    @Get('/findOneById')
    findOneById(
        @Query('id', ParseIntPipe) id: number
    ) {
        return this.usersService.findOneById(id);
    }

    @Get('/findOneByEmail')
    findOneByEmail(
        @Query('email') email: string
    ) {
        return this.usersService.findOneByEmail(email);
    }

    @Post('/create')
    createOne(
        @Body() createUserDto: UserCreateInput
    ) {
        return this.usersService.createOne(createUserDto);
    }

    @Put('/update')
    updateOne(
        @Req() req: Request,
        @Body() updateUserDto: UserUpdateInput
    ): Promise<UserModel> {
        const user = req["user"];
        return this.usersService.updateOne(user["email"], updateUserDto);
    }

    @Delete('/delete')
    deleteOne(@Query('id', ParseIntPipe) id: number) {
        return this.usersService.deleteOne(id);
    }
}
