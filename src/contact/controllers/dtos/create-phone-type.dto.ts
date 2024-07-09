import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsIn } from 'class-validator';

export class CreatePhoneTypeDto {
  @ApiProperty({
    example: 1,
    description: 'Phone type ID (1 for LANDLINE, 2 for MOBILE)',
  })
  @IsNotEmpty()
  @IsIn([1, 2], {
    message: 'Phone type must be either 1 (LANDLINE) or 2 (MOBILE)',
  })
  readonly id: number;
}
