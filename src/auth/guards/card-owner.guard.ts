import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/card/entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardOwnerGuard implements CanActivate {
    constructor(
        @InjectRepository(Card)
        private cardsRepository: Repository<Card>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const cardId = request.params.id;

        const card = await this.cardsRepository.findOne({
            where: { id: cardId },
            relations: ['column', 'column.user'],
        });

        if (!card) {
            throw new NotFoundException('Card not found');
        }

        if (card.column.user.id !== user.id) {
            throw new ForbiddenException('You do not have permission to access this card');
        }

        return true;
    }
}
