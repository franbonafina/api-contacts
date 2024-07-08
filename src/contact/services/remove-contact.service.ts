import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      throw new NotFoundException('Contact not found');
    }

    const queryRunner =
      this.personRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.remove(person.phones);
      await queryRunner.manager.remove(person.addresses);
      await queryRunner.manager.remove(person);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error(`The contact DELETE operation failed due to: ${err}`);
      throw new HttpException(
        'Failed to delete contact',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
