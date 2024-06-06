import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [
    TypeOrmModule.forFeature([Card]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})
export class CardModule { }
