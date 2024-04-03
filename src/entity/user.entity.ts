import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @OneToMany(() => Chat, (chat) => chat.id)
  chat: Chat[];
}
