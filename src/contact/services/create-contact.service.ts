import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { Phone } from '../entities/phone.entity';
import { CreateContactDto } from '../controllers/dtos/create-contact.dto';
import { SearchContactService } from './search-contact.service';

@Injectable()
export class CreateContactService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
    private readonly searchContactsService: SearchContactService,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Person> {
    const { personDto, addressesDtos, phonesDtos } = createContactDto;
    console.log(
      `Creating new contact with details: ${JSON.stringify(createContactDto)}`,
    );

    // Check if already exist the contact by email or phone-number
    const contactExists =
      await this.searchContactsService.findIfAlreadyExistsByEmailOrPhone(
        personDto.email,
        phonesDtos.map((p) => p.number),
      );
    if (contactExists) {
      throw new HttpException(
        "There's already a contact registered with the provided email or phone number",
        HttpStatus.CONFLICT,
      );
    }

    //Start transaction
    const queryRunner =
      this.personRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create person
      const person = this.personRepository.create({
        ...personDto,
      });
      await queryRunner.manager.save(person);

      // Create phones
      const phones = phonesDtos.map((p) =>
        this.phoneRepository.create({ ...p, person: person }),
      );
      await queryRunner.manager.save(phones);

      // Create addresses
      const addresses = addressesDtos.map((addr) =>
        this.addressRepository.create({ ...addr, person: person }),
      );
      await queryRunner.manager.save(addresses);

      //Commit and release transaction
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return person;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(`The contact create operation failed due to: ${err}`);
      throw new HttpException(
        'Failed to create new resource Contact',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
