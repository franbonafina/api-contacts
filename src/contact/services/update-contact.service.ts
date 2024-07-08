import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { EntityManager, Repository } from 'typeorm';
import { UpdateContactDto } from '../controllers/dtos/update-contact.dto';

Injectable();
export class UpdateContactService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Person> {
    console.log(
      `Updated the contact with details: ${id}, ${JSON.stringify(
        updateContactDto,
      )}`,
    );

    // Check if the person exists
    const person = await this.personRepository.findOne({ where: { id } });
    if (!person) {
      throw new NotFoundException('Contact not found');
    }

    // Check if the email is being updated and if it's already in use by another person
    if (
      updateContactDto.person?.email &&
      updateContactDto.person.email !== person.email
    ) {
      const existingPersonWithEmail = await this.personRepository.findOne({
        where: { email: updateContactDto.person.email },
      });
      if (existingPersonWithEmail) {
        throw new HttpException(
          'Email is already in use',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // Create a new query runner and start a transaction
    const queryRunner =
      this.personRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Update person fields
      if (updateContactDto.person) {
        const { firstName, lastName, email, dateOfBirth } =
          updateContactDto.person;
        if (firstName) person.firstName = firstName;
        if (lastName) person.lastName = lastName;
        if (email) person.email = email;
        if (dateOfBirth) person.dateOfBirth = dateOfBirth;
      }

      // Save updated person entity within the transaction
      await queryRunner.manager.save(Person, person);

      // Commit the transaction
      await queryRunner.commitTransaction();

      // Return the updated person
      return person;
    } catch (err) {
      // Rollback the transaction in case of an error
      await queryRunner.rollbackTransaction();

      // Log the error and rethrow it
      console.error(`The contact UPDATE operation failed due to: ${err}`);
      throw new HttpException(
        'Failed to update contact',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}
