import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginRequest, RegisterRequest } from './types';
import { Public } from './decorators/public.decorator';

@Controller('api/v1/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Public()
    @Post('/login')
    async login(
        @Body() loginRequest: LoginRequest
    ): Promise<{ access_token: string }> {
        const user = await this.authService.validateUser(loginRequest);
        if (!user) throw new UnauthorizedException();

        return this.authService.login(user);
    }

    @Public()
    @Post('/register')
    async register(
        @Body() registerRequest: RegisterRequest
    ): Promise<{ access_token: string }> {
        const user = await this.authService.registerUser(registerRequest);
        if (!user) throw new UnauthorizedException();

        return this.authService.login(user);
    }
}
