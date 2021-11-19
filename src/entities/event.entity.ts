import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  is_use: boolean; //

  @Column()
  condition_query: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  plus_minus: string;

  @Column()
  applied_column: string;

  @Column({ type: 'double' })
  applied_number: number;
}
