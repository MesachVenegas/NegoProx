import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long',
  })
  password: string;
}

export class authResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbTR2bXd0NWYwMDAwa211YzRiMW93aGFvIiwiZW1haWwiOiJtZXNhY2gudmVuZWdhc0Bob3RtYWlsLmNvbSIsImlhdCI6MTczNDYzMTY3MywiZXhwIjoxNzM0NjM1MjczfQ.zJF0puP3WWdnMqnPnrxLYSXO3lBaITTLbXhLeAo5ql8',
  })
  access_token: string;
}
