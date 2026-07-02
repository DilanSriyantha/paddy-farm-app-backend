import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginRequest, RegisterRequest } from './types';
import { User } from 'src/generated/prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(loginRequest: LoginRequest): Promise<any> {
        const user = await this.usersService.findOneByEmail(loginRequest.email);
        if (!user) return null;
        if (!await bcrypt.compare(loginRequest.password, user.password)) return null;

        const { password, ...result } = user;

        return result;
    }

    async registerUser(registerRequest: RegisterRequest): Promise<any> {
        const user = await this.usersService.createOne(registerRequest);
        if (!user) return null;

        const payload = { ...user, password: registerRequest.password };

        return this.validateUser(payload);
    }

    async login(user: User) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
