import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Chatroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => User)
  participants: User[];
}
