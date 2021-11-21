import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deer } from '../entities/deer.entity';

@Injectable()
export class DeerService {
  constructor(
    @InjectRepository(Deer)
    private readonly deerRepository: Repository<Deer>,
  ) {}

  async findOneById(deer_name: number): Promise<Deer> {
    const deer = await this.deerRepository.findOne({ deer_name });
    if (!deer) {
      throw new NotFoundException('유효한 킥보드 번호가 아닙니다.');
    }
    return deer;
  }
}
