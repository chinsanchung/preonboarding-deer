import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from './area.entity';
import { History } from './history.entity';

@Entity()
export class Deer {
  @PrimaryGeneratedColumn()
  deer_name: number;

  @OneToMany((_type) => History, (history) => history.deer, { eager: true , cascade:true})
  histories: History[];

  @ManyToOne((_type) => Area, (area) => area.deers, { eager: false })
  area: Area;
}
