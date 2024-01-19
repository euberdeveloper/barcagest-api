import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 200 })
  surname: string;

  @Column({ length: 200 })
  phoneNumber: string;

  @Column({ length: 320, unique: true })
  email: string;

  @Column({ length: 200 })
  country: string;

  @Column({ length: 200 })
  city: string;

  @Column({ length: 200 })
  zipCode: string;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 200 })
  birthPlace: string;

  @Column()
  birthDate: Date;

  @Column({ length: 200 })
  fiscalCode: string;

  @Column({ length: 200 })
  documentNumber: string;
}
