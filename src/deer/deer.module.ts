import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deer } from '../entities/deer.entity';
import { DeerService } from './deer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Deer])],
  providers: [DeerService],
  exports: [DeerService],
})
export class DeerModule {}
