import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateCardDto {
    @ApiProperty({
        example: 'Название карточки',
        description: 'Название карточки',
    })
    @IsString()
    @IsOptional()
    @MinLength(3, {
        message: 'Название карточки слишком короткое. Минимальная длина - 3 символа.',
    })
    @MaxLength(20, {
        message: 'Название карточки слишком длинное. Максимальная длина - 20 символов.',
    })
    readonly title?: string;

    @ApiProperty({
        example: 'Описание карточки',
        description: 'Описание карточки',
    })
    @IsString()
    @IsOptional()
    @MinLength(5, {
        message: 'Описание карточки слишком короткое. Минимальная длина - 5 символов.',
    })
    @MaxLength(200, {
        message: 'Описание карточки слишком длинное. Максимальная длина - 200 символов.',
    })
    readonly description?: string;
}
