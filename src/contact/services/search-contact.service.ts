import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { In, Repository } from 'typeorm';
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
      relations: ['addresses', 'phones', 'phones.phoneType'],
    });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    return person;
  }

  async findByPhoneNumberAndType(phoneNumber: string, phoneTypeId: number) {
    const foundContact = await this.phoneRepository
      .createQueryBuilder('phone')
      .leftJoinAndSelect('phone.person', 'person')
      .leftJoinAndSelect('person.addresses', 'address')
      .leftJoinAndSelect('person.phones', 'phones')
      .where('phone.number = :phoneNumber', { phoneNumber })
      .andWhere('phone.phoneTypeId = :phoneTypeId', { phoneTypeId })
      .getMany();

    if (!foundContact || foundContact.length === 0) {
      throw new NotFoundException('Contacts not found');
    }

    return foundContact.map((phone) => phone.person);
  }

  async findByPersonalData(queryDto: QueryPersonalDataDto): Promise<Person[]> {
    const { firstName, lastName, email, dateOfBirth } = queryDto;
    const queryBuilder = this.personRepository.createQueryBuilder('person');

    if (firstName) {
      queryBuilder.andWhere('person.firstName LIKE :firstName', {
        firstName: `%${firstName}%`,
      });
    }
    if (lastName) {
      queryBuilder.andWhere('person.lastName LIKE :lastName', {
        lastName: `%${lastName}%`,
      });
    }
    if (email) {
      queryBuilder.andWhere('person.email LIKE :email', {
        email: `%${email}%`,
      });
    }
    if (dateOfBirth) {
      queryBuilder.andWhere('person.dateOfBirth = :dateOfBirth', {
        dateOfBirth,
      });
    }

    queryBuilder
      .leftJoinAndSelect('person.phones', 'phones')
      .leftJoinAndSelect('person.addresses', 'addresses')
      .leftJoinAndSelect('phones.phoneType', 'phoneType');

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
