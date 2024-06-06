import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ColumnEntity } from 'src/column/entities/column.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(dto);
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findAllColumnByUser(id: number): Promise<ColumnEntity[]> {
        const user = await this.userRepository.findOne({
            where: {
                id
            },
            relations: ['columns']
        });

        if(!user) throw new NotFoundException('User not found')

        return user.columns
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                id
            },
        });
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, updateUserDto);
        const updatedUser = await this.userRepository.findOneBy({ id });
        return updatedUser;
    }

    async remove(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (user) {
          await this.userRepository.remove(user);
        }
        return user;
    }
}
