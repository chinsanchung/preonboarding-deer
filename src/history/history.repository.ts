import { History } from '../entities/history.entity';
import { EntityRepository, IsNull, Not, Repository } from 'typeorm';
import { UpdateHistroyDto } from './dto/update-history.dto';
import { User } from '../entities/user.entity';
import * as moment from 'moment-timezone';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {
  async updateReturnHistory(
    id: number,
    updateHistroyDto: UpdateHistroyDto,
    user: User,
  ) {
    const history = await this.findOne({
      history_id: id,
      user,
    });

    const { base_price, min_price } = history.deer.area;
    let price = 0;
    const use_end_at = new Date();
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

    try {
      return await this.save(history);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    //const { latitude, longitude } = updateHistroyDto;

    //const historyQuery = this.createQueryBuilder('history')
    //  .where('history_id = :id', { id })
    //  .leftJoin('history.deer', 'deer')
    //  .leftJoin('deer.area', 'area')
    //  .leftJoinAndSelect('area.parkingzones', 'parkingzone')
    //  .leftJoinAndSelect('area.forbidden_areas', 'forbidden_area')
    //  .addSelect(
    //    'ST_Contains(area.area_boundary, ST_GeomFromText(:p))',
    //    'isInArea',
    //  )
    //  .addSelect(
    //    'ST_DISTANCE(ST_GEOMFROMTEXT(ST_ASTEXT(parkingzone.parkingzone_center_coord), 4326), ST_GEOMFROMTEXT(:p, 4326)) < parkingzone.parkingzone_radius',
    //    'isInParkingzone',
    //  )
    //  .addSelect(
    //    'ST_Contains(forbidden_area.forbidden_area_boundary, ST_GeomFromText(:p))',
    //    'isInForbiddenArea',
    //  )
    //  .setParameters({
    //    p: `POINT (${latitude} ${longitude})`,
    //  })
    //  .execute();
    //return historyQuery;

    // const historyQuery = this.createQueryBuilder('history');

    // const parkingArea = await historyQuery
    //   .leftJoin('history.deer', 'deer')
    //   .leftJoin('deer.area', 'area')
    //   .where('ST_Contains(area.area_boundary, ST_GeomFromText(:p))', {
    //     p: `POINT (${latitude} ${longitude})`,
    //   })
    //   .andWhere('history_id = :id', { id })
    //   .execute();

    // // area내에 있을때
    // if (parkingArea) {
    //   const parkingzone = await parkingArea
    //     .leftJoinAndSelect('area.parkingzones', 'parkingzone')
    //     .andWhere(
    //       `ST_Distance(ST_GEOMFROMTEXT(ST_ASTEXT(parkingzone.parkingzone_center_coord), 4326), ST_GEOMFROMTEXT(:p, 4326), 'metre') < parkingzone.parkingzone_radius`,
    //       {
    //         p: `POINT (${latitude} ${longitude})`,
    //       },
    //     )
    //     .andWhere('parkingzone.areaAreaId = area.area_id')
    //     .execute();

    //     // if(parkingzone) {
    //     //   //할인
    //     // } else if() {
    //     //   //금지구역
    //     // }
    //     return parkingzone;
    // } else {
    //   //지역 얼마나 벗어났는지 계산
    // }

    // // return history;
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
