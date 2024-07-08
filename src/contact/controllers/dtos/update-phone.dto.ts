import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdatePhoneDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  readonly id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  readonly number?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  readonly phoneType?: string;
}
