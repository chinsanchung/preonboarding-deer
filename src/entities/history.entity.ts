import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Deer } from './deer.entity';
import { User } from './user.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  user_deer_name: number;

  @Column({ type: 'point', srid: 4326 })
  use_end_coord: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  use_start_at: Date;

  @Column({ type: 'timestamp' })
  use_end_at: Date;

  @Column()
  price: number;

  @ManyToOne((_type) => User, (user) => user.histories, { eager: false })
  user: User;

  @ManyToOne((_type) => Deer, (deer) => deer.histories, { eager: false })
  deer: Deer;
}
