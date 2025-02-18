import { Role } from '@/shared/constants/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

class UserSigned {
  @ApiProperty({ example: '112321edasd12' })
  id: string;
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;
  @ApiProperty({ example: 'John' })
  name: string;
  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  picture: string;
  @ApiProperty({ example: Role.USER })
  @IsString()
  role: Role;
}
export class AuthResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => UserSigned)
  user: UserSigned;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
