import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, JoinColumn } from "typeorm";
import { Person } from './person.entity';
import { PhoneType } from './phone-type.entity';

@Entity({ name: 'Phone' })
@Index('idx_phone_search', ['number'], { unique: true })
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @ManyToOne(() => Person, (person) => person.phones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  person: Person;

  @ManyToOne(() => PhoneType, (phoneType) => phoneType.phones, {
    nullable: false,
  })
  phoneType: PhoneType;
}
