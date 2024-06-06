import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.columns)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Card, card => card.column)
  cards: Card[];
}
