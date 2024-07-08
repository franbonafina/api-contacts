import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Person } from './entities/person.entity';
import { PhoneType } from './entities/phone-type.entity';
import { Phone } from './entities/phone.entity';
import { Address } from './entities/address.entity';
import { ContactsController } from './controllers/contact.controller';
import { CreateContactService } from './services/create-contact.service';
import { UpdateContactService } from './services/update-contact.service';
import { RemoveContactService } from './services/remove-contact.service';
import { SearchContactService } from './services/search-contact.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/contact-list.db',
      entities: [Person, PhoneType, Phone, Address],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Person, PhoneType, Phone, Address]),
  ],
  controllers: [ContactsController],
  providers: [
    CreateContactService,
    UpdateContactService,
    RemoveContactService,
    SearchContactService,
  ],
})
export class ContactModule {}
