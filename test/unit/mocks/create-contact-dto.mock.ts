import { CreateContactDto } from '../../../src/contact/controllers/dtos/create-contact.dto';
import { CreatePhoneDto } from '../../../src/contact/controllers/dtos/create-phone.dto';
import { PhoneType } from '../../../src/contact/entities/phone-type.entity';

const phoneType: PhoneType = new PhoneType();

const phone: CreatePhoneDto = {
  number: '12274567890',
  phoneType,
};

export const createMockContactDto: CreateContactDto = {
  person: {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    email: 'john.doe@example.com',
  },
  addresses: [
    {
      locality: 'New York',
      street: '123 Main St',
      number: 1,
      notes: 'Apartment 101',
    },
  ],
  phones: [phone],
};
