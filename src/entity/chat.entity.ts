import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Chat {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.chat)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
