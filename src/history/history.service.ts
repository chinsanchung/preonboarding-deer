import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeerService } from '../deer/deer.service';
import { User } from '../entities/user.entity';
import { CreateHistroyDto } from './dto/create-history.dto';
import { HistoryRepository } from './history.repository';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryRepository)
    private historyRepository: HistoryRepository,
    private deerService: DeerService,
  ) {}

  async createRentalHistory(
    createHistroyDto: CreateHistroyDto,
    user: User,
  ): Promise<{ message: string; history_id: number; use_start_at: Date }> {
    const deer = await this.deerService.findOneById(createHistroyDto.deer_name);
    const history = this.historyRepository.create({
      user,
      deer,
    });
    try {
      const { history_id, use_start_at } = await this.historyRepository.save(
        history,
      );
      return { message: '대여가 완료 되었습니다.', history_id, use_start_at };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
