import { Role } from '@/domain/constants/role.enum';
import { CreateServiceDto } from '@/infrastructure/dto/business';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateNewServiceDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  data: CreateServiceDto;
}
