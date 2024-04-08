import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.chat)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
