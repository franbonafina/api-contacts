import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiNotFoundResponse,
  ApiOperation, ApiQuery
} from "@nestjs/swagger";
import { CreateContactDto } from './dtos/create-contact.dto';
import { UpdateContactDto } from './dtos/update-contact.dto';
import { QueryPersonalDataDto } from './dtos/query-personal-data.dto';
import { CreateContactService } from '../services/create-contact.service';
import { SearchContactService } from '../services/search-contact.service';
import { UpdateContactService } from '../services/update-contact.service';
import { RemoveContactService } from '../services/remove-contact.service';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly createContactsService: CreateContactService,
    private readonly searchContactsService: SearchContactService,
    private readonly updateContactsService: UpdateContactService,
    private readonly removeContactsService: RemoveContactService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiResponse({ status: 201, description: 'Contact created successfully' })
  async create(@Body() createContactDto: CreateContactDto) {
    const createdContact = await this.createContactsService.create(
      createContactDto,
    );

    console.log(
      `New contact created successfully with ID: ${createdContact.id}`,
    );
    return {
      statusCode: 201,
      message: 'Contact created successfully',
      data: createdContact,
    };
  }

  @Get('search/email')
  @ApiOperation({ summary: 'Search a contact by email' })
  @ApiQuery({ name: 'email', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Found contact by email' })
  @ApiNotFoundResponse({ description: 'Contact not found' })
  async findByEmail(@Query('email') email: string) {
    const foundContact = await this.searchContactsService.findByEmail(email);
    if (!foundContact) {
      throw new NotFoundException('Contact not found');
    }
    return {
      statusCode: 200,
      message: 'Found contact by email',
      data: foundContact,
    };
  }

  @Get('search/phone')
  @ApiOperation({ summary: 'Search contacts by phone number and phone type' })
  @ApiQuery({ name: 'typeId', required: true, type: Number })
  @ApiQuery({ name: 'phoneNumber', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Found contacts by phone number' })
  async findByPhoneNumber(
    @Query('typeId') typeId: number,
    @Query('phoneNumber') number: string,
  ) {
    const foundContacts =
      await this.searchContactsService.findByPhoneNumberAndType(number, typeId);

    return {
      statusCode: 200,
      message: 'Found contact by phone number',
      data: foundContacts,
    };
  }

  @Get('search/personal-data')
  @ApiOperation({ summary: 'Search a contact by its personal information' })
  @ApiResponse({ status: 200, description: 'Found contacts by search criteria' })
  async findByQuery(@Query() queryDto: QueryPersonalDataDto) {
    const foundContacts = await this.searchContactsService.findByPersonalData(
      queryDto,
    );
    return {
      statusCode: 200,
      message: 'Found contacts by search criteria',
      data: foundContacts,
    };
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a contact (personal information)' })
  @ApiResponse({ status: 200, description: 'Contact updated successfully' })
  @ApiNotFoundResponse({ description: 'Contact not found' })
  async update(
    @Param('id') id: number,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    const updatedContact = await this.updateContactsService.update(
      id,
      updateContactDto,
    );

    console.log(
      `The contact with ID ${updatedContact.id} was successfully updated.`,
    );
    return {
      statusCode: 200,
      message: 'Contact updated successfully',
      data: updatedContact,
    };
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Remove a contact' })
  @ApiResponse({ status: 200, description: 'Contact deleted successfully' })
  @ApiNotFoundResponse({ description: 'Contact not found' })
  async delete(@Param('id') id: number) {
    const deletedContact = await this.removeContactsService.delete(id);
    return {
      statusCode: 200,
      message: 'Contact deleted successfully',
      data: deletedContact,
    };
  }
}
