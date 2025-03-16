import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { CreateAvailabilityDto } from '@/infrastructure/dto/availability';
import { AuthorizationDto } from '@/infrastructure/dto/auth/authorization.dto';

export class CreateAvalability extends AuthorizationDto {
  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  data: CreateAvailabilityDto[];
}
