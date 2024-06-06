import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CardOwnerGuard } from 'src/auth/guards/card-owner.guard';
import { Comment } from 'src/comment/entities/comment.entity';

@ApiTags('Карточки')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @ApiOperation({ summary: 'Создание новой карточки' })
  @ApiResponse({ status: 201, description: 'Карточка успешно создана.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  @Post()
  async create(@Body() сreateCardDto: CreateCardDto): Promise<Card> {
    return await this.cardService.create(сreateCardDto);
  }

  @ApiOperation({ summary: 'Получение списка всех карточек' })
  @ApiResponse({ status: 200, description: 'Список всех карточек.' })
  @Get()
  async findAll(): Promise<Card[]> {
    return await this.cardService.findAll();
  }

  @ApiOperation({ summary: 'Получение комментариев по ID карточки' })
  @ApiResponse({ status: 200, description: 'Список комментариев' })
  @ApiResponse({ status: 404, description: 'Карточка не найдена.' })
  @Get(':id/comments')
  findAllCommentByColumnId(@Param('id') id: number): Promise<Comment[]> {
    return this.cardService.findAllCommentByColumnId(+id);
  }

  @ApiOperation({ summary: 'Получение карточки по ID' })
  @ApiResponse({ status: 200, description: 'Данные карточки.' })
  @ApiResponse({ status: 404, description: 'Карточка не найдена.' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Card> {
    return await this.cardService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление карточки по ID' })
  @ApiResponse({ status: 200, description: 'Карточка успешно обновлена.' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен.' })
  @ApiResponse({ status: 404, description: 'Карточка не найдена.' })
  @UseGuards(CardOwnerGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCardDto: UpdateCardDto): Promise<Card> {
    return await this.cardService.update(id, updateCardDto);
  }

  @ApiOperation({ summary: 'Удаление карточки по ID' })
  @ApiResponse({ status: 200, description: 'Карточка успешно удалена.' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен.' })
  @ApiResponse({ status: 404, description: 'Карточка не найдена.' })
  @UseGuards(CardOwnerGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Card> {
    return this.cardService.remove(+id);
  }
}
