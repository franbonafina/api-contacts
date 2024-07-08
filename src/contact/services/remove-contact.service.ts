import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { Phone } from '../entities/phone.entity';

@Injectable()
export class RemoveContactService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) {}

  async delete(id: number): Promise<void> {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['phones', 'addresses'],
    });
    if (!person) {
      throw new NotFoundException('Person not found');
    }

    await this.personRepository.remove(person);
  }
}
