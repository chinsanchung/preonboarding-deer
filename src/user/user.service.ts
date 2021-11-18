import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const existedUser = await this.userRepository.findOne({
      where: {
        user_id: createUserDto.user_id,
      },
    });

    if (existedUser) {
      throw new ConflictException('이미 가입된 id입니다');
    }

    try {
      const user = this.userRepository.create(createUserDto);
      const { password, ...result } = await this.userRepository.save(user);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        '회원 가입에 오류가 발생하였습니다.',
      );
    }
  }

  async signIn(signInDto: SignInDto) {
    const { user_id, password } = signInDto;
    const user = await this.userRepository.findOne({ user_id });

    if (user && (await bcrypt.compare(password, user.password))) {
      const loginedAt = new Date();
      user.loginedAt = loginedAt;
      await this.userRepository.save(user);
      return user;
    } else {
      throw new UnauthorizedException('회원 정보가 일치하지 않습니다');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
