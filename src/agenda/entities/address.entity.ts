import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, person => person.addresses)
  person: Person;

  @Column()
  locality: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column({ nullable: true })
  notes: string;
}
