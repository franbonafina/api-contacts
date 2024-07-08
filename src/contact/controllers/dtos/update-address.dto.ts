import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateAddressDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  readonly id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  readonly locality?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  readonly street?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  readonly number?: number;

  @ApiPropertyOptional()
  @IsOptional()
  readonly notes?: string;
}
