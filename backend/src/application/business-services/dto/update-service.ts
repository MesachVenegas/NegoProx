import { IsNotEmpty, ValidateNested } from 'class-validator';

import { VerifiesParamsDto } from './validation-params';
import { CreateServiceDto } from '@/infrastructure/dto/business';
import { Type } from 'class-transformer';

export class UpdateServiceDto extends VerifiesParamsDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  dto: Partial<CreateServiceDto>;
}
