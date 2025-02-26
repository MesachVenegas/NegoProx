import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { UpdateUserProfileDto } from './update-user-profile';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserProfileDto)
  @IsNotEmpty()
  userProfile?: UpdateUserProfileDto;
}
