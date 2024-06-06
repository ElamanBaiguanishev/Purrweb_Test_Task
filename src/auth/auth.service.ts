import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }


    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.findUserByEmail(userDto.email)

        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5)

        const user = await this.userService.createUser({ ...userDto, password: hashPassword })

        return this.generateToken(user)
    }

    async generateToken(user: User) {
        const payload = { email: user.email, id: user.id }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.findUserByEmail(userDto.email);

        if (!user) {
            throw new BadRequestException({ message: 'Некорректный email или пароль' });
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password);

        if (passwordEquals) {
            return user;
        }

        throw new BadRequestException({ message: 'Некорректный email или пароль' });
    }
}
