import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserCreateInput, UserModel, UserUpdateInput } from 'src/generated/prisma/models';
import { Public } from 'src/auth/decorators/public.decorator';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) { }

    @Public()
    async findAll(): Promise<UserModel[]> {
        return this.prisma.user.findMany();
    }

    async findOneById(id: number): Promise<UserModel> {
        const user = this.prisma.user.findUniqueOrThrow({
            where: { id }
        });

        return user;
    }

    async findOneByEmail(email: string): Promise<UserModel> {
        const user = this.prisma.user.findUniqueOrThrow({
            where: { email }
        });

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

    async updateOne(email: string, data: UserUpdateInput): Promise<UserModel> {
        const user = await this.findOneByEmail(email);

        return this.prisma.user.update({
            where: { id: user.id },
            data,
        });
    }

    async deleteOne(id: number): Promise<UserModel> {
        await this.findOneById(id);

        return this.prisma.user.delete({
            where: { id }
        });
    }
}
