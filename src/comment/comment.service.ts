import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
  ) { }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = {
      content: createCommentDto.content,
      card: { id: +createCommentDto.card }
    }

    if (!newComment) throw new BadRequestException('Somethins went wrong')

    return await this.commentRepository.save(newComment);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find({
      relations: ['card'],
      select: {
        card: {
          id: true,
        },
      }
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: {
        id
      },
      relations: ['card'],
      select: {
        card: {
          id: true,
        },
      },
    });

    if (!comment) {
      throw new NotFoundException("Comment not found")
    }

    return comment
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    await this.commentRepository.update(id, updateCommentDto);
    const updatedComment = await this.commentRepository.findOneBy({ id });
    return updatedComment;
  }

  async remove(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id });
    if (comment) {
      await this.commentRepository.remove(comment);
    }
    return comment;
  }
}
