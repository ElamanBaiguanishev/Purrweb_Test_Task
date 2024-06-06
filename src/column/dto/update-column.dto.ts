import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateColumnDto {
    @ApiProperty({
        example: 'Название колонки',
        description: 'Название колонки',
    })
    @IsString()
    @IsOptional()
    @MinLength(3, {
        message: 'Название колонки слишком короткое. Минимальная длина - 3 символа.',
    })
    @MaxLength(20, {
        message: 'Название колонки слишком длинное. Максимальная длина - 20 символов.',
    })
    title?: string;
}