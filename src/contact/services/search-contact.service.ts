import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { Brackets, In, Repository } from "typeorm";
import { QueryPersonalDataDto } from '../controllers/dtos/query-personal-data.dto';
import { Phone } from '../entities/phone.entity';

@Injectable()
export class SearchContactService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) {}

  async findByEmail(email: string): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { email },
      relations: ['addresses', 'phones'],
    });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    return person;
  }

  async findByPhoneNumber(phoneNumber: string) {
    const foundContacts = await this.personRepository.find({
      where: { phones: { number: phoneNumber } },
      relations: ['addresses', 'phones'],
    });

    if (!foundContacts || foundContacts.length === 0) {
      throw new NotFoundException('Contacts not found');
    }

    return foundContacts;
  }

  async findByPersonalData(queryDto: QueryPersonalDataDto): Promise<Person[]> {
    const { firstName, lastName, email, locality, street, phone, value } =
      queryDto;
    let queryBuilder = this.personRepository.createQueryBuilder('person');

    if (firstName) {
      queryBuilder = queryBuilder.where('person.firstName LIKE :value', {
        value: `%${value}%`,
      });
    }
    if (lastName) {
      queryBuilder = queryBuilder.orWhere('person.lastName LIKE :value', {
        value: `%${value}%`,
      });
    }
    if (email) {
      queryBuilder = queryBuilder.orWhere('person.email LIKE :value', {
        value: `%${value}%`,
      });
    }
    if (locality) {
      queryBuilder = queryBuilder
        .leftJoin('person.addresses', 'address')
        .andWhere('address.locality LIKE :value', { value: `%${value}%` });
    }
    if (street) {
      queryBuilder = queryBuilder
        .leftJoin('person.addresses', 'address')
        .andWhere('address.street LIKE :value', { value: `%${value}%` });
    }
    if (phone) {
      queryBuilder = queryBuilder
        .leftJoin('person.phones', 'phone')
        .andWhere('phone.number LIKE :value', { value: `%${value}%` });
    }

    return await queryBuilder.getMany();
  }

  async findIfAlreadyExistsByEmailOrPhone(
    email: string,
    phoneNumbers: string[],
  ): Promise<boolean> {
    const existingEmail = await this.personRepository.findOne({
      where: { email },
    });
    const existingPhones = await this.phoneRepository.findOne({
      where: { number: In(phoneNumbers) },
    });

    return !!existingEmail || !!existingPhones;
  }
}
