import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserCreateInput, UserModel, UserUpdateInput } from 'src/generated/prisma/models';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) { }

    async findAll(): Promise<UserModel[]> {
        return this.prisma.user.findMany();
    }

    async findOneById(id: number): Promise<UserModel | null> {
        const user = this.prisma.user.findUnique({
            where: { id }
        });

        if (!user) throw new NotFoundException(`User with ID ${id} not found`);

        return user;
    }

    async findOneByEmail(email: string): Promise<UserModel | null> {
        const user = this.prisma.user.findUnique({
            where: { email }
        });

        if (!user) throw new NotFoundException(`User with Email ${email} not found`);

        return user;
    }

    async createOne(data: UserCreateInput): Promise<UserModel> {
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

    async updateOne(id: number, data: UserUpdateInput): Promise<UserModel> {
        await this.findOneById(id);

        return this.prisma.user.update({
            where: { id },
            data
        });
    }

    async deleteOne(id: number): Promise<UserModel> {
        await this.findOneById(id);

        return this.prisma.user.delete({
            where: { id }
        });
    }
}
