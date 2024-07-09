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
  readonly personDto: CreatePersonDto;

  @ApiProperty({ type: [CreateAddressDto] })
  //@MinLength(1, { message: 'At least one address must be provided' })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  readonly addressesDtos: CreateAddressDto[];

  @ApiProperty({ type: [CreatePhoneDto] })
  //@MinLength(1, { message: 'At least one address must be provided' })
  @ValidateNested({ each: true })
  @Type(() => CreatePhoneDto)
  readonly phonesDtos: CreatePhoneDto[];
}
