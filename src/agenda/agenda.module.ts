import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Person } from './entities/person.entity';
import { PhoneType } from './entities/phone-type.entity';
import { Phone } from './entities/phone.entity';
import { Address } from './entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../../migrations/contact-list.db',
      entities: [Person, PhoneType, Phone, Address],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Person, PhoneType, Phone, Address]),
  ],
  controllers: [],
  providers: [],
})
export class AgendaModule {}
