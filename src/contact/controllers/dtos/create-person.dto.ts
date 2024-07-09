import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePersonDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth of the person in YYYY-MM-DD format',
  })
  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString())
  dateOfBirth?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;
}
