import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCommentDto {
    @ApiProperty({
        example: 'Контент',
        description: 'Сам комментарий',
    })
    @IsString()
    @IsOptional()
    content?: string;
}