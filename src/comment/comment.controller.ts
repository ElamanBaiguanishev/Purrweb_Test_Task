import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Comment } from './entities/comment.entity';

@ApiTags('Комментарии')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe())
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @ApiOperation({ summary: 'Создание нового комментария' })
  @ApiResponse({ status: 201, description: 'Комментарий успешно создан.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Получение списка всех комментариев' })
  @ApiResponse({ status: 200, description: 'Список всех комментариев.' })
  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: 'Получение комментария по ID' })
  @ApiResponse({ status: 200, description: 'Данные комментария.' })
  @ApiResponse({ status: 404, description: 'Комментарий не найден.' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновление комментария по ID' })
  @ApiResponse({ status: 200, description: 'Комментарий успешно обновлен.' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен.' })
  @ApiResponse({ status: 404, description: 'Комментарий не найден.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
    return this.commentService.update(+id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Удаление комментария по ID' })
  @ApiResponse({ status: 200, description: 'Комментарий успешн удален.' })
  @ApiResponse({ status: 403, description: 'Доступ запрещен.' })
  @ApiResponse({ status: 404, description: 'Комментарий не найден.' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Comment> {
    return this.commentService.remove(+id);
  }
}
