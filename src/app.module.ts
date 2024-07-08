import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';
import { StatusModule } from './status/status.module'

@Module({
  imports: [ContactModule, StatusModule],
})
export class AppModule {}
