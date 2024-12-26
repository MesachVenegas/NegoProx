import { IsEmail, IsNotEmpty, IsString, Matches, Min } from 'class-validator';

export class EmailRequestDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
export class ResetPasswordDto {
  @IsString()
  @Min(6)
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long',
  })
  password: string;
}
