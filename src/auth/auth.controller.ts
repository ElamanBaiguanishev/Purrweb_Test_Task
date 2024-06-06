import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Авторизация')
@Controller('auth')
@ApiResponse({ status: 400, description: 'Некорректные данные.' })
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Логин' })
    @ApiResponse({ status: 201, description: 'Успешная авторизация' })
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @ApiOperation({ summary: 'Регистрация' })
    @ApiResponse({ status: 201, description: 'Успешная регистрация' })
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
