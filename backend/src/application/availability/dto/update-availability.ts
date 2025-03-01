import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { CreateAvailabilityDto } from '@/infrastructure/dto/availability/create-availability';
import { AuthorizationDto } from '@/infrastructure/dto/auth/authorization.dto';

export class UpdateAvalability extends AuthorizationDto {
  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  data: Partial<CreateAvailabilityDto>;
}
