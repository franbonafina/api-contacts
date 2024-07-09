import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatePersonDto } from './update-person.dto';

export class UpdateContactDto {
  @ApiPropertyOptional({ type: UpdatePersonDto })
  @ValidateNested()
  @Type(() => UpdatePersonDto)
  @IsOptional()
  readonly person?: UpdatePersonDto;
}
