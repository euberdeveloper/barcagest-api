import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 320, unique: true })
  email: string;

  @Column({ length: 16 })
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
