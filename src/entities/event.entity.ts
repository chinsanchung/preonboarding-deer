import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  is_use: boolean;

  @Column()
  condition_field: string;

  @Column()
  condition_eq: string;

  @Column()
  condition_value: string;

  @Column()
  plus_minus: string;

  @Column({ type: 'double' })
  applied_number: number;

  @Column()
  condition: string;
}
