import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly locality: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly street: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly number: number;

  @ApiProperty({ required: false })
  readonly notes?: string;
}
