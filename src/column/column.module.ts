import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ColumnEntity } from './entities/column.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService],
  imports: [
    TypeOrmModule.forFeature([ColumnEntity, User]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})
export class ColumnModule { }
