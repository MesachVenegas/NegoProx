import { Role } from '@/domain/constants/role.enum';
import { UpdateBusinessDto } from '@/infrastructure/dto/business';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class UpdateBusinessParamsDto {
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
  @Type(() => UpdateBusinessDto)
  @ValidateNested({ each: true })
  dto: Partial<UpdateBusinessDto>;
}
