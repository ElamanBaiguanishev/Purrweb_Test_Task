import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/column/entities/column.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
    constructor(
        @InjectRepository(ColumnEntity)
        private columnsRepository: Repository<ColumnEntity>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const columnId = request.params.id;
        const column = await this.columnsRepository.findOne({
            where: { id: columnId },
            relations: ['user'],
        });

        if (!column) {
            throw new NotFoundException('Column not found');
        }

        if (column.user.id !== user.id) {
            throw new ForbiddenException('You do not have permission to access this column');
        }

        return true;
    }
}
