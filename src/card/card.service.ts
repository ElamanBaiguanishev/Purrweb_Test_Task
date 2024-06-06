import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) { }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const newCard = {
      title: createCardDto.title,
      description: createCardDto.description,
      column: { id: +createCardDto.column }
    }

    if (!newCard) throw new BadRequestException('Somethins went wrong')

    return await this.cardRepository.save(newCard);
  }

  async findAll(): Promise<Card[]> {
    return await this.cardRepository.find({
      relations: ['column'],
      select: {
        column: {
          id: true,
        },
      },
    });
  }

  async findAllCommentByColumnId(id: number): Promise<Comment[]> {
    const card = await this.cardRepository.findOne({
      where: {
        id
      },
      relations: ['comments']
    })

    if(!card) throw new NotFoundException("Card not found")

    return card.comments
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: {
        id
      },
      relations: ['column'],
      select: {
        column: {
          id: true,
        },
      },
    });

    if (!card) {
      throw new NotFoundException("Card not found")
    }

    return card
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    await this.cardRepository.update(id, updateCardDto);
    const updatedCard = await this.cardRepository.findOneBy({ id });
    return updatedCard;
  }

  async remove(id: number): Promise<Card> {
    const card = await this.cardRepository.findOneBy({ id });
    if (card) {
      await this.cardRepository.remove(card);
    }
    return card;
  }
}
