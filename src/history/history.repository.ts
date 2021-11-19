import { History } from '../entities/history.entity';
import { EntityRepository, IsNull, Not, Repository } from 'typeorm';
import { UpdateHistroyDto } from './dto/update-history.dto';
import { User } from '../entities/user.entity';
import * as moment from 'moment-timezone';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {
  async historyFindOne(id: number, user: User): Promise<History> {
    const history = await this.findOne({
      history_id: id,
      user,
    });
    if (!history) {
      throw new NotFoundException('유효한 요청이 아닙니다.');
    }
    return history;
  }

  async updateReturnHistory(
    id: number,
    updateHistroyDto: UpdateHistroyDto,
    user: User,
  ) {
    let sendData: any = {};
    let price = 0;
    const { latitude, longitude } = updateHistroyDto;

    const use_end_at = new Date();
    const history = await this.historyFindOne(id, user);
    if (history.use_end_at) {
      throw new BadRequestException('이미 반납된 요청입니다.');
    }

    const { base_price, min_price } = history.deer.area;
    const useMin = this.getTimeDiff(history.use_start_at, use_end_at);

    //사용시간 1분 이상일때
    if (useMin > 1) {
      price = base_price + min_price * useMin;
    }

    //환승 30분 이내일때
    if (this.checkTransfer(user, history)) {
      price = min_price * useMin;
    }

    history.price = price;
    history.use_end_at = use_end_at;

    const historyQuery = await this.createQueryBuilder('history')
      .where('history_id = :id', { id })
      .leftJoin('history.deer', 'deer')
      .leftJoin('deer.area', 'area')
      .leftJoin('area.parkingzones', 'parkingzone')
      .leftJoin('area.forbidden_areas', 'forbidden_area')
      .addSelect(
        'SUM(ST_Contains(area.area_boundary, ST_GeomFromText(:p)))',
        'isInArea',
      )
      .addSelect(
        'SUM(ST_DISTANCE(ST_GEOMFROMTEXT(ST_ASTEXT(parkingzone.parkingzone_center_coord), 4326), ST_GEOMFROMTEXT(:p, 4326)) < parkingzone.parkingzone_radius)',
        'isInParkingzone',
      )
      .addSelect(
        'SUM(ST_Contains(forbidden_area.forbidden_area_boundary, ST_GeomFromText(:p)))',
        'isInForbiddenArea',
      )
      .groupBy('history_id')
      .setParameters({
        p: `POINT (${latitude} ${longitude})`,
      })
      .execute();

    const { isInArea, isInParkingzone, isInForbiddenArea } = historyQuery[0];
    sendData = {
      ...history,
      useMin,
      isInArea,
      isInParkingzone,
      isInForbiddenArea,
    };
    //TODO :: 이벤트 구현 후 주석 제거
    // history.price = await this.eventSevice(sendData);
    try {
      return await this.save(history);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async checkTransfer(user: User, history: History) {
    const previousHistory = await this.findOne({
      where: {
        user,
        use_end_at: Not(IsNull()),
      },
      order: {
        history_id: 'DESC',
      },
    });

    if (!previousHistory) {
      return false;
    }

    return (
      this.getTimeDiff(history.use_start_at, previousHistory.use_end_at) <= 30
    );
  }

  getTimeDiff(start_at, end_at) {
    const use_start_at = moment(start_at).tz('Asia/Seoul');
    const use_end_at = moment(end_at).tz('Asia/Seoul');

    return use_end_at.diff(use_start_at, 'minutes');
  }
}
