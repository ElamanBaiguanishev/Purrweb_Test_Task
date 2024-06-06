import { ColumnEntity } from 'src/column/entities/column.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('cards')
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => ColumnEntity, (column) => column.cards)
    @JoinColumn({ name: 'columnId' })
    column: ColumnEntity;

    @OneToMany(() => Comment, comment => comment.card)
    comments: Comment[];
}
