import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsIn, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PhoneType } from '../../entities/phone-type.entity';

export class CreatePhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn([1, 2], {
    message: 'Phone type must be either 1 (LANDLINE) or 2 (MOBILE)',
  })
  @Transform(({ value }) => {
    const phoneType = new PhoneType();
    phoneType.id = value;
    return phoneType;
  })
  readonly phoneType: PhoneType;
}
