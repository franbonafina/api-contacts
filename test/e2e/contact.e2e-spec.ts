import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('ContactsController (e2e)', () => {
  let app: INestApplication;
  const number_random = Math.floor(Math.random() * 900) + 100;
  const email = 'john.doee' + number_random + '@example.com';
  const phone_number = '12272092' + number_random;
  let contactId = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/contacts/create (POST) - Create a new contact', async () => {
    const createDto = {
      personDto: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        email: email,
      },
      addressesDtos: [
        {
          locality: 'New York',
          street: '123 Main St',
          number: 1,
          notes: 'Apartment 101',
        },
      ],
      phonesDtos: [
        {
          number: phone_number,
          phoneType: {
            id: 1,
          },
        },
      ],
    };

    const response = await request(app.getHttpServer())
      .post('/contacts/create')
      .send(createDto)
      .expect(201);

    expect(response.text).toContain('Contact created successfully');

    contactId = JSON.parse(response.text).data.id;
  });

  it('/contacts/search/email (GET) - Find contact by email', async () => {
    const response = await request(app.getHttpServer())
      .get(`/contacts/search/email`)
      .query({ email: email })
      .expect(200);

    expect(response.text).toContain('Found contact by email');
  });

  it('/contacts/search/phone (GET) - Find contacts by phone number and phone type', async () => {
    const typeId = 1;
    const response = await request(app.getHttpServer())
      .get('/contacts/search/phone')
      .query({ typeId, phoneNumber: phone_number })
      .expect(200);

    expect(response.text).toContain('Found contact by phone number');
  });

  it('/contacts/search/personal-data/:query (GET) - Search contacts by personal data', async () => {
    const queryDto = {
      firstName: 'John',
    };

    const response = await request(app.getHttpServer())
      .get('/contacts/search/personal-data')
      .query(queryDto)
      .expect(200);

    expect(response.text).toContain('Found contacts by search criteria');
  });

  it('/contacts/update/:id (PUT) - Update a contact', async () => {
    const updateDto = {
      person: {
        firstName: 'Updated First Name twice',
      },
    };

    const response = await request(app.getHttpServer())
      .put(`/contacts/update/${encodeURIComponent(contactId)}`)
      .send(updateDto)
      .expect(200);

    expect(response.text).toContain('Contact updated successfully');
    expect(response.text).toContain(updateDto.person.firstName);
  });

  it('/contacts/delete/:id (DELETE) - Delete a contact', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/contacts/delete/${encodeURIComponent(contactId)}`)
      .expect(200);

    expect(response.text).toContain('Contact deleted');
  });
});
