import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity({ name: 'Address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, (person) => person.addresses, {
    nullable: false,
    onDelete: 'CASCADE',
  })
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
