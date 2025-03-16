import { Role } from '@/domain/constants/role.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AuthorizationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
