import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { Phone } from '../entities/phone.entity';
import { UpdateContactDto } from '../controllers/dtos/update-contact.dto';

@Injectable()
export class UpdateContactService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) {}

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['phones', 'addresses'],
    });
    if (!person) {
      throw new NotFoundException('Contact not found');
    }

    if (updateContactDto.person) {
      const { firstName, lastName, email, dateOfBirth } =
        updateContactDto.person;
      if (firstName) person.firstName = firstName;
      if (lastName) person.lastName = lastName;
      if (email) person.email = email;
      if (dateOfBirth) person.dateOfBirth = dateOfBirth;
    }

    if (updateContactDto.phones) {
      for (const updatePhoneDto of updateContactDto.phones) {
        let phone;
        if (updatePhoneDto.id) {
          phone = person.phones.find((p) => p.id === updatePhoneDto.id);
        }
        if (!phone) {
          phone = this.phoneRepository.create({ person });
          person.phones.push(phone);
        }
        if (updatePhoneDto.number) phone.number = updatePhoneDto.number;
      }
    }

    if (updateContactDto.addresses) {
      for (const updateAddressDto of updateContactDto.addresses) {
        let address;
        if (updateAddressDto.id) {
          address = person.addresses.find((a) => a.id === updateAddressDto.id);
        }
        if (!address) {
          address = this.addressRepository.create({ person });
          person.addresses.push(address);
        }
        if (updateAddressDto.locality)
          address.locality = updateAddressDto.locality;
        if (updateAddressDto.street) address.street = updateAddressDto.street;
        if (updateAddressDto.number) address.number = updateAddressDto.number;
        if (updateAddressDto.notes) address.notes = updateAddressDto.notes;
      }
    }

    await this.personRepository.save(person);

    return await this.personRepository.findOne({
      where: { id },
      relations: ['phones', 'addresses'],
    });
  }
}
