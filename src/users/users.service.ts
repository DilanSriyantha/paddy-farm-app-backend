import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) { }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOneById(id: number) {
        const user = this.prisma.user.findUnique({
            where: { id }
        });

        if (!user) throw new NotFoundException(`User with ID ${id} not found`);

        return user;
    }

    async findOneByEmail(email: string) {
        const user = this.prisma.user.findUnique({
            where: { email }
        });

        if (!user) throw new NotFoundException(`User with Email ${email} not found`);

        return user;
    }

    async createOne(data: Prisma.UserCreateInput) {
        const existingUser = await this.findOneByEmail(data.email);
        if (existingUser) throw new ConflictException("Email already registered!");

        const hashedPassword = await bcrypt.hash(data.password, 10);
        if (!hashedPassword) throw new InternalServerErrorException("Failed to hash password");

        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        });
    }

    async updateOne(id: number, data: Prisma.UserUpdateInput) {
        await this.findOneById(id);

        return this.prisma.user.update({
            where: { id },
            data
        });
    }

    async deleteOne(id: number) {
        await this.findOneById(id);

        return this.prisma.user.delete({
            where: { id }
        });
    }
}
