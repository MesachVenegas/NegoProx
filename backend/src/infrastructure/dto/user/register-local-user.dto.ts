import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterLocalUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[\d\W]).{6,}$/, {
    message:
      'password must be at least 6 characters and contain at least one letter and one number or special character',
  })
  password: string;
}
