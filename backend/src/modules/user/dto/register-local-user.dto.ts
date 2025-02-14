import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class RegisterLocalUserDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[\d\W]).{6,}$/, {
    message:
      'password must be at least 6 characters and contain at least one letter and one number or special character',
  })
  password: string;
}
