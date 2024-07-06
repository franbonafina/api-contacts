import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Phone } from './phone.entity';
import { Address } from './address.entity';

@Entity()
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

  @OneToMany(() => Phone, phone => phone.person)
  phones: Phone[];

  @OneToMany(() => Address, address => address.person)
  addresses: Address[];
}
