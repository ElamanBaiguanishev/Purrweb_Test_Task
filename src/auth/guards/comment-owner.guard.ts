import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const commentId = request.params.id;
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: ['card', 'card.column', 'card.column.user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.card.column.user.id !== user.id) {
      throw new ForbiddenException('You do not have permission to access this comment');
    }

    return true;
  }
}
