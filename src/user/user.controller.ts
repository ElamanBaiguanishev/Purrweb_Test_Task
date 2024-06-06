import { Body, Controller, Get, Post, Patch, Delete, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ColumnEntity } from 'src/column/entities/column.entity';

@ApiTags('Пользователи')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь успешно создан.' })
    @ApiResponse({ status: 400, description: 'Некорректные данные.' })
    @Post()
    create(@Body() userDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({ status: 200, description: 'Список всех пользователей.' })
    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Получение всех колонок пользователя' })
    @ApiResponse({ status: 200, description: 'Список колонок' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден.' })
    @Get(':id/columns')
    findAllColumnByUser(@Param('id') id: number): Promise<ColumnEntity[]> {
        return this.userService.findAllColumnByUser(+id);
    }

    @ApiOperation({ summary: 'Получение пользователя по ID' })
    @ApiResponse({ status: 200, description: 'Данные пользователя.' })
    @ApiResponse({ status: 404, description: 'Пользователь не найдена.' })
    @Get(':id')
    findOne(@Param('id') id: number): Promise<User> {
        return this.userService.findOne(+id);
    }

    @ApiOperation({ summary: 'Обновление пользователя по ID' })
    @ApiResponse({ status: 200, description: 'Пользователь успешно обновлен.' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден.' })
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.update(+id, updateUserDto);
    }

    @ApiOperation({ summary: 'Удаление пользователя по ID' })
    @ApiResponse({ status: 200, description: 'Пользователь успешно удален.' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден.' })
    @Delete(':id')
    remove(@Param('id') id: number): Promise<User> {
        return this.userService.remove(+id);
    }
}
