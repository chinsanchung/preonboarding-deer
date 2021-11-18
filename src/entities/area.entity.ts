import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Deer } from './deer.entity';
import { Forbidden_area } from './forbidden_area.entity';
import { Parkingzone } from './parkingzone.entity';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  area_id: number;

  @Column()
  area_name: string;

  @Column({ type: 'polygon', srid: 4326 })
  area_boundary: string;

  @Column({ type: 'point', srid: 4326 })
  area_center: string;

  @Column({ type: 'multipoint', srid: 4326 })
  area_coords: string;

  @Column()
  base_price: number;

  @Column()
  min_price: number;

  @OneToMany((_type) => Deer, (deer) => deer.area, { eager: true })
  deers: Deer[];

  @OneToMany((_type) => Parkingzone, (parkingzone) => parkingzone.area, {
    eager: true,
  })
  parkingzones: Parkingzone[];

  @OneToMany(
    (_type) => Forbidden_area,
    (forbidden_area) => forbidden_area.area,
    { eager: true },
  )
  forbidden_areas: Forbidden_area[];
}
