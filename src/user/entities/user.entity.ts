import { ApiProperty } from "@nestjs/swagger";
import { ColumnEntity } from "src/column/entities/column.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @ApiProperty({
        example: '1',
        description: 'id user',
    })
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => ColumnEntity, (column) => column.user)
    columns: ColumnEntity[];
}
