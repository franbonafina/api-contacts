import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsEmail, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePersonDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  readonly firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  readonly lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  readonly email?: string;

  @ApiPropertyOptional({
    example: '1990-01-01',
    description: 'Date of birth of the contact in YYYY-MM-DD format',
  })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString())
  readonly dateOfBirth?: string;
}
