import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export class QueryPersonalDataDto {
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  firstName?: string;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  lastName?: string;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  email?: string;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString())
  dateOfBirth?: string;
}
