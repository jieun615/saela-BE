import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;
}
