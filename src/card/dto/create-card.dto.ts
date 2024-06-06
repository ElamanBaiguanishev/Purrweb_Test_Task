import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ColumnEntity } from "src/column/entities/column.entity";

export class CreateCardDto {
    @ApiProperty({
        example: 'Название карточки',
        description: 'Название карточки',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3, {
        message: 'Название карточки слишком короткое. Минимальная длина - 3 символа.',
    })
    @MaxLength(20, {
        message: 'Название карточки слишком длинное. Максимальная длина - 20 символов.',
    })
    readonly title: string;

    @ApiProperty({
        example: 'Описание карточки',
        description: 'Описание карточки',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(5, {
        message: 'Описание карточки слишком короткое. Минимальная длина - 5 символов.',
    })
    @MaxLength(200, {
        message: 'Описание карточки слишком длинное. Максимальная длина - 200 символов.',
    })
    readonly description: string;

    @ApiProperty({
        example: 1,
        description: 'ID колонки, которой принадлежит карточка',
    })
    @IsNotEmpty()
    readonly column: ColumnEntity
}
