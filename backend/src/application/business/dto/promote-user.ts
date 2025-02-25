import { ResponseUserDto } from '@/infrastructure/dto/user';
import { RegisterBusinessDto } from '@/infrastructure/dto/business';

export class PromoteUserParamsDto {
  dto: RegisterBusinessDto;
  user: ResponseUserDto;
}
