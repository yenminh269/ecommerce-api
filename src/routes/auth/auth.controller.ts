import { Controller, Post, Body, SerializeOptions } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterBodyDTO, RegisterResponseDTO, LoginBodyDTO, LoginResponseDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    // @SerializeOptions({ type: RegisterResponseDTO })
    @Post('register')
    async register(@Body() body: RegisterBodyDTO) {
        console.log("controller..");
        return new RegisterResponseDTO(await this.authService.register(body));
    }

    @Post('login')
    async login(@Body() body: LoginBodyDTO) {
        console.log("controller..");
        return new LoginResponseDTO(await this.authService.login(body));
    }
}
