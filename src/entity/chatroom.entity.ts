import { CreateDateColumn, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Chatroom {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => User)
  participants: User[];
}
