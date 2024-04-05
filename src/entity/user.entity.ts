import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chat } from './chat.entity';

import * as bcrypt from 'bcrypt';
import { IsNotEmpty, Length, Matches } from 'class-validator';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  @IsNotEmpty()
  id: string;

  @Column()
  @Length(8, 20)
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  @Matches(/\d{2,3}-\d{3,4}-\d{4}/, {
    message: '전화번호 형식이 올바르지 않습니다.',
  })
  phoneNumber: string;

  @Column()
  @IsNotEmpty()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Chat, (chat) => chat.id)
  chat: Chat[];

  @BeforeInsert()
  private beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
