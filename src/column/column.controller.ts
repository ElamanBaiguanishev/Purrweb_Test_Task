import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ApiOperation, ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ColumnOwnerGuard } from 'src/auth/guards/column-owner.guard';
import { ColumnEntity } from './entities/column.entity';
import { Card } from 'src/card/entities/card.entity';

@ApiTags('Колонки')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
@Controller('columns')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
export class ColumnController {
  constructor(private readonly columnService: ColumnService) { }

  @ApiOperation({ summary: 'Создание новой колонки' })
  @ApiResponse({ status: 201, description: 'Колонка успешно создана.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  @Post()
  create(@Body() createColumnDto: CreateColumnDto, @Req() req): Promise<ColumnEntity> {
    return this.columnService.create(createColumnDto, +req.user.id);
  }

  @ApiOperation({ summary: 'Получение списка всех колонок' })
  @ApiResponse({ status: 200, description: 'Список всех колонок.' })
  @Get()
  findAll(): Promise<ColumnEntity[]> {
    return this.columnService.findAll();
  }

  @ApiOperation({ summary: 'Получение карточек по ID колонки' })
  @ApiResponse({ status: 200, description: 'Список карточек' })
  @ApiResponse({ status: 404, description: 'Колонка не найдена.' })
  @Get(':id/cards')
  findAllCardByColumnId(@Param('id') id: number): Promise<Card[]> {
    return this.columnService.findAllCardByColumnId(+id);
  }


  @ApiOperation({ summary: 'Получение колонки по ID' })
  @ApiResponse({ status: 200, description: 'Данные колонки.' })
  @ApiResponse({ status: 404, description: 'Колонка не найдена.' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<ColumnEntity> {
    return this.columnService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновление колонки по ID' })
  @ApiResponse({ status: 200, description: 'Колонка успешно обновлена.' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен.' })
  @ApiResponse({ status: 404, description: 'Колонка не найдена.' })
  @UseGuards(ColumnOwnerGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateColumnDto: UpdateColumnDto): Promise<ColumnEntity> {
    return this.columnService.update(+id, updateColumnDto);
  }

  @ApiOperation({ summary: 'Удаление колонки по ID' })
  @ApiResponse({ status: 200, description: 'Колонка успешно удалена.' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен.' })
  @ApiResponse({ status: 404, description: 'Колонка не найдена.' })
  @UseGuards(ColumnOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<ColumnEntity> {
    return this.columnService.remove(+id);
  }
}
