import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from './area.entity';

@Entity()
export class Forbidden_area {
  @PrimaryGeneratedColumn()
  forbidden_area_id: number;

  @Column({ type: 'polygon', srid: 4326 })
  forbidden_area_boundary: string;

  @Column({ type: 'multipoint', srid: 4326 })
  forbidden_area_coords: string;

  @ManyToOne((_type) => Area, (area) => area.forbidden_areas, { eager: false })
  area: Area;
}
