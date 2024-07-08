import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  JoinColumn,
} from 'typeorm';
import { Phone } from './phone.entity';
import { Address } from './address.entity';

@Entity({ name: 'Person' })
@Index(['email'], { unique: true })
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column()
  email: string;

  @OneToMany(() => Phone, (phone) => phone.person, { cascade: true })
  phones: Phone[];

  @OneToMany(() => Address, (address) => address.person, { cascade: true })
  addresses: Address[];
}
