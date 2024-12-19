import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { authResponseDto } from './login.dto';

export class RegisterDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  last_name: string;

  @ApiProperty({ example: 'jhon.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ enum: Role, example: Role.USER, required: false })
  @IsOptional()
  @IsEnum(Role)
  @IsString()
  user_role: Role;

  @ApiProperty({ example: 'Secure12345!' })
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long',
  })
  password: string;
}

export class RegisterDtoResponse extends authResponseDto {
  @ApiProperty({ example: 'Verify email sent' })
  message: string;
}
