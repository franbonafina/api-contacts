import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('ContactsController (e2e)', () => {
  let app: INestApplication;
  const number_random = Math.floor(Math.random() * 900) + 100;
  const email = 'john.doee' + number_random + '@example.com';
  const phone_number = '12272092' + number_random;

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

  it('/contacts (POST) - Create a new contact', async () => {
    const createDto = {
      person: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        email: email,
      },
      addresses: [
        {
          locality: 'New York',
          street: '123 Main St',
          number: 1,
          notes: 'Apartment 101',
        },
      ],
      phones: [
        {
          number: phone_number,
          phoneType: {
            id: 1,
          },
        },
      ],
    };

    const response = await request(app.getHttpServer())
      .post('/contacts')
      .send(createDto)
      .expect(201);

    console.log(response);

    expect(response.text).toContain('Contact created successfully');
  });

  it('/contacts/:email (GET) - Find contact by email', async () => {
    const response = await request(app.getHttpServer())
      .get(`/contacts/${encodeURIComponent(email)}`)
      .expect(200);

    expect(response.text).toContain('Found contact by email');
  });
});
