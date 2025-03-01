import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { AuthorizationDto } from '@/infrastructure/dto/auth/authorization.dto';
import { UpdateAvailabilityDto } from '@/infrastructure/dto/availability/update-availability';

export class UpdateAvalability extends AuthorizationDto {
  @IsString()
  @IsNotEmpty()
  availabilityId: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  data: UpdateAvailabilityDto;
}
