import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long',
  })
  password: string;
}
