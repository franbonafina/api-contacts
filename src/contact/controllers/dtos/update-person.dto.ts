import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsEmail, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePersonDto {
  @IsNotEmpty()
  readonly id: number;

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value.toISOString(), { toClassOnly: true })
  readonly dateOfBirth?: string;
}
