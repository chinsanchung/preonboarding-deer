import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

const mockUserRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

jest.mock('../auth/auth.service');

describe('UserService', () => {
  let service: UserService;
  let authService: AuthService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository() },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect.assertions(3);
    expect(service).toBeDefined();
    expect(authService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    const user_id = 'testuser';
    const password = 'password';
    const createUserDto = { user_id, password };
    const id = 1;

    it('회원 가입에 성공한다', async () => {
      expect.assertions(2);

      userRepository.findOne.mockResolvedValue(undefined);

      const result = new User();
      result.id = id;
      result.user_id = user_id;
      userRepository.save.mockResolvedValue(result);

      const expectUser = await service.createUser(createUserDto);
      expect(expectUser.id).toEqual(result.id);
      expect(expectUser.user_id).toEqual(result.user_id);
    });

    it('ID가 중복되어 가입에 실패한다', async () => {
      expect.assertions(2);

      const existedUser = new User();
      existedUser.id = id;
      existedUser.user_id = user_id;

      userRepository.findOne.mockResolvedValue(existedUser);
      try {
        const result = await service.createUser(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toEqual('이미 가입된 id입니다');
      }
    });
  });

  describe('signIn', () => {
    const user_id = 'testuser';
    const password = 'password';
    const id = 1;

    it('로그인에 성공한다', async () => {
      const signInDto = { user_id, password };

      const user = new User();
      user.id = id;
      user.user_id = user_id;
      user.password = password;
      userRepository.findOne.mockResolvedValue(user);

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const access_token = 'TOKEN';
      const result = { access_token };
      jest.spyOn(authService, 'jwtSign').mockReturnValue(result);

      const expectResult = await service.signIn(signInDto);
      expect(expectResult.access_token).toEqual(result.access_token);
    });

    it('비밀번호가 일치하지 않아 로그인에 실패한다', async () => {
      expect.assertions(2);

      const signInDto = { user_id, password };

      const user = new User();
      user.id = id;
      user.user_id = user_id;
      user.password = password;
      userRepository.findOne.mockResolvedValue(user);

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      try {
        const expectResult = await service.signIn(signInDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toEqual('회원 정보가 일치하지 않습니다');
      }
    });
  });

  describe('findOneByUserId', () => {
    it('유저 조회에 성공한다', async () => {
      expect.assertions(3);

      const user_id = 'testuser';
      const password = 'password';
      const id = 1;

      const user = new User();
      user.id = id;
      user.password = password;
      user.user_id = user_id;

      userRepository.findOne.mockResolvedValue(user);

      const expectUser = await service.findOneByUserId(user_id);
      expect(expectUser.id).toEqual(id);
      expect(expectUser.user_id).toEqual(user_id);
      expect(expectUser.password).toEqual(password);
    });

    it('유저가 존재하지 않아 조회에 실패한다', async () => {
      expect.assertions(2);

      const user_id = 'notExistUser';

      userRepository.findOne.mockResolvedValue(undefined);

      try {
        const expectUser = await service.findOneByUserId(user_id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('유효한 아이디가 아닙니다');
      }
    });
  });
});
