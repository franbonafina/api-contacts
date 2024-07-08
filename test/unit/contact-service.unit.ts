import { Test, TestingModule } from '@nestjs/testing';
import { CreateContactService } from '../../src/contact/services/create-contact.service';
import { SearchContactService } from '../../src/contact/services/search-contact.service';
import { Person } from '../../src/contact/entities/person.entity';
import { Phone } from '../../src/contact/entities/phone.entity';
import { Address } from '../../src/contact/entities/address.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockPhone } from './mocks/phone.mock';
import { mockPerson } from './mocks/person.mock';
import { mockAddress } from './mocks/address.mock';
import { createMockContactDto } from './mocks/create-contact-dto.mock';
import { Connection, Repository } from "typeorm";
import { HttpException } from "@nestjs/common";

describe('CreateContactService', () => {
  let createContactService: CreateContactService;
  let personRepository: jest.Mocked<Repository<Person>>;
  let phoneRepository: jest.Mocked<Repository<Phone>>;
  let addressRepository: jest.Mocked<Repository<Address>>;

  beforeAll(async () => {
    const mockQueryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateContactService,
        SearchContactService,
        {
          provide: getRepositoryToken(Person),
          useValue: {
            create: jest.fn().mockResolvedValue(mockPerson),
            save: jest.fn().mockResolvedValue(mockPerson),
            manager: {
              connection: {
                createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
              },
            },
          },
        },
        {
          provide: getRepositoryToken(Phone),
          useValue: {
            create: jest.fn().mockResolvedValue(mockPhone),
            save: jest.fn().mockResolvedValue(mockPhone),
          },
        },
        {
          provide: getRepositoryToken(Address),
          useValue: {
            create: jest.fn().mockResolvedValue(mockAddress),
            save: jest.fn().mockResolvedValue(mockAddress),
          },
        },
      ],
    })
      .overrideProvider(SearchContactService)
      .useValue({
        findIfAlreadyExistsByEmailOrPhone: jest.fn().mockResolvedValue(false),
      })
      .compile();

    createContactService =
      module.get<CreateContactService>(CreateContactService);
  });

  it('should be defined', () => {
    expect(createContactService).toBeDefined();
  });

  it('should not create a new contact', async () => {
    await expect(
      createContactService.create(createMockContactDto),
    ).rejects.toThrow(HttpException);
  });
});
