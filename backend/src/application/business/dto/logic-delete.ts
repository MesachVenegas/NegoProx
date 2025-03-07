import { Role } from '@/domain/constants/role.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class LogicDeleteBusinessDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(Role)
  userType: Role;
}
