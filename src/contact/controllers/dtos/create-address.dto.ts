import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

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
  @IsOptional()
  readonly notes?: string;
}
