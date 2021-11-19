import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Deer } from './deer.entity';
import { User } from './user.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  history_id: number;

  @Column({ type: 'point', srid: 4326, nullable: true })
  use_end_coord: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  use_start_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  use_end_at: Date;

  @Column({ nullable: true })
  price: number;

  @ManyToOne((_type) => User, (user) => user.histories, { eager: false })
  user: User;

  @ManyToOne((_type) => Deer, (deer) => deer.histories, {
    eager: false,
    onDelete: 'CASCADE',
  })
  deer: Deer;
}
