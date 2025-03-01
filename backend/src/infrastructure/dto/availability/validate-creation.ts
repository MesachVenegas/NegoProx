import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateAvailabilityDto } from './create-availability';
import { Type } from 'class-transformer';

export class ValidateCreationAvailabilityDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAvailabilityDto)
  data: CreateAvailabilityDto[];
}
