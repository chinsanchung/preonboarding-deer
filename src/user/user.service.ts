import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
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

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { user_id, password } = signInDto;
    const user = await this.userRepository.findOne({ user_id });

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.authService.jwtSign(user);
    } else {
      throw new UnauthorizedException('회원 정보가 일치하지 않습니다');
    }
  }

  async findOneByUserId(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({ user_id });

    if (!user) {
      throw new NotFoundException('유효한 아이디가 아닙니다.');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
