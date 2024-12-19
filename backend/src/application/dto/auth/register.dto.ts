import { Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsEnum(Role)
  @IsString()
  user_role: Role;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long',
  })
  password: string;
}

@Exclude()
export class UserRegisteredDTO {
  @Expose() id: string;
  @Expose() email: string;
  @Expose() name: string;
  @Expose() last_name: string;
  @Expose() phone: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
}
