import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class CreateColumnDto {
  @ApiProperty({
    example: 'Название колонки',
    description: 'Название колонки',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Название колонки слишком короткое. Минимальная длина - 3 символа.',
  })
  @MaxLength(20, {
    message: 'Название колонки слишком длинное. Максимальная длина - 20 символов.',
  })
  title: string;

  user: User
}
