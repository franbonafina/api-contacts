import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, ValidateNested } from 'class-validator';
import { CreatePhoneTypeDto } from './create-phone-type.dto';
import { Type } from 'class-transformer';

export class CreatePhoneDto {
  @ApiProperty({
    example: '+5491137879077',
    description: 'Phone number of the contact',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly number: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreatePhoneTypeDto)
  @IsNotEmpty()
  readonly phoneType: CreatePhoneTypeDto;
}
