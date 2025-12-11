import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { RegisterBodyDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    register(@Body() body: RegisterBodyDTO) {
        console.log(body);
        return 'register'
    }
}
