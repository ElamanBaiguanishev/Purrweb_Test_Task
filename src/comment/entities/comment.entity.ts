import { Card } from 'src/card/entities/card.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Card, card => card.comments)
  @JoinColumn({ name: 'cardId' })
  card: Card;
}
