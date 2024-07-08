import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePersonDto } from './create-person.dto';
import { CreateAddressDto } from './create-address.dto';
import { CreatePhoneDto } from './create-phone.dto';

export class CreateContactDto {
  @ApiProperty({ type: CreatePersonDto })
  @ValidateNested()
  @Type(() => CreatePersonDto)
  readonly person: CreatePersonDto;

  @ApiProperty({ type: [CreateAddressDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @MinLength(1, { message: 'At least one address must be provided' })
  readonly addresses: CreateAddressDto[];

  @ApiProperty({ type: [CreatePhoneDto] })
  @ValidateNested({ each: true })
  @Type(() => CreatePhoneDto)
  @MinLength(1, { message: 'At least one address must be provided' })
  readonly phones: CreatePhoneDto[];
}
