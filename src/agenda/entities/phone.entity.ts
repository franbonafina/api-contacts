import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Person } from './person.entity';
import { PhoneType } from './phone-type.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @ManyToOne(() => Person, person => person.phones)
  person: Person;

  @ManyToOne(() => PhoneType, phoneType => phoneType.phones)
  phoneType: PhoneType;
}
