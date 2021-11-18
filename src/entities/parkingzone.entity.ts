import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from './area.entity';

@Entity()
export class Parkingzone {
  @PrimaryGeneratedColumn()
  parkingzone_id: number;

  @Column({ type: 'point', srid: 4326 })
  parkingzone_center_coord: string;

  @Column({ type: 'double' })
  parkingzone_radius: number;

  @ManyToOne((_type) => Area, (area) => area.forbidden_areas, { eager: false })
  area: Area;
}
