import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/card/entities/card.entity';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Контент',
    description: 'Сам комментарий',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Комментарий слишком короткий. Минимальная длина - 10 символов.',
  })
  @MaxLength(500, {
    message: 'Комментарий слишком длинный. Максимальная длина - 500 символов.',
  })
  readonly content: string;

  @ApiProperty({
    example: 1,
    description: 'ID карточки, которой принадлежит комментарий',
  })
  @IsNotEmpty()
  readonly card: Card
}
