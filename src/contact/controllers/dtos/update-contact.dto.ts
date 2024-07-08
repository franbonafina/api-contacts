import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatePersonDto } from './update-person.dto';
import { UpdatePhoneDto } from './update-phone.dto';
import { UpdateAddressDto } from './update-address.dto';

export class UpdateContactDto {
  @ApiPropertyOptional({ type: UpdatePersonDto })
  @ValidateNested()
  @Type(() => UpdatePersonDto)
  @IsOptional()
  readonly person?: UpdatePersonDto;

  @ApiPropertyOptional({ type: [UpdatePhoneDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdatePhoneDto)
  @IsOptional()
  readonly phones?: UpdatePhoneDto[];

  @ApiPropertyOptional({ type: [UpdateAddressDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  @IsOptional()
  readonly addresses?: UpdateAddressDto[];
}
