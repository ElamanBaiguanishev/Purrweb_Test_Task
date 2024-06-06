import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Card } from 'src/card/entities/card.entity';
import { log } from 'console';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity) private readonly columnRepository: Repository<ColumnEntity>
  ) { }

  async create(createColumnDto: CreateColumnDto, id: number): Promise<ColumnEntity> {
    const newColumn = {
      title: createColumnDto.title,
      user: { id }
    }

    if (!newColumn) throw new BadRequestException('Somethins went wrong')

    return await this.columnRepository.save(newColumn);
  }

  async findAll(): Promise<ColumnEntity[]> {
    const column = await this.columnRepository.find({
      relations: ['user'],
      select: {
        user: {
          id: true,
        },
      },
    });

    if (!column) {
      throw new NotFoundException("Column not found")
    }

    return column
  }

  async findAllCardByColumnId(id: number): Promise<Card[]> {
    const column = await this.columnRepository.findOne({
      where: {
        id
      },
      relations: ['cards']
    });

    if(!column) throw new NotFoundException('Column not found')

    return column.cards
  }

  async findOne(id: number): Promise<ColumnEntity> {
    return this.columnRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        user: {
          id: true,
        },
      },
    });
  }

  async update(id: number, updateColumnDto: UpdateColumnDto): Promise<ColumnEntity> {
    await this.columnRepository.update(id, updateColumnDto);
    const updatedColumn = await this.columnRepository.findOneBy({ id });
    return updatedColumn;
  }

  async remove(id: number): Promise<ColumnEntity> {
    const column = await this.columnRepository.findOneBy({ id });
    if (column) {
      await this.columnRepository.remove(column);
    }
    return column;
  }
}
