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

  user = new User();
  async createRentalHistory(createHistroyDto: CreateHistroyDto) {
    const deer = await this.deerService.findOneById(createHistroyDto.deer_name);
    this.user.id = 1;
    const history = this.historyRepository.create({
      user: this.user,
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
