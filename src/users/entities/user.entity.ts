import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 320, unique: true })
  email: string;

  @Column({ length: 16 })
  password: string;
}
