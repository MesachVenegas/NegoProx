import { AuthorizationDto } from '@/infrastructure/dto/auth/authorization.dto';

export class ConnectServiceAvailabilityDto extends AuthorizationDto {
  availabilityId: string;
  serviceId: string;
}
