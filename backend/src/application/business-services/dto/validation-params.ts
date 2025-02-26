import { Role } from '@/domain/constants/role.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class VerifiesParamsDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  serviceId: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
