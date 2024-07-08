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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value.toISOString(), { toClassOnly: true })
  dateOfBirth?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;
}
