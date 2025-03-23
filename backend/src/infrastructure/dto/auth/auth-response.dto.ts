import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNumber, IsString, IsUrl } from 'class-validator';

import { Role } from '@/domain/constants/role.enum';

export class UserSigned {
  @ApiProperty({ example: '1123210934802932' })
  @IsString()
  sub: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  @IsUrl()
  avatar: string;

  @ApiProperty({ example: Role.USER })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ example: 1 })
  @IsNumber()
  tokenVersion: number;

  @ApiProperty({ example: 1742677912 })
  @IsNumber()
  iat: number;

  @ApiProperty({ example: 1742764312 })
  @IsNumber()
  exp: number;
}
// export class AuthResponseDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   @ValidateNested({ each: true })
//   @Type(() => UserSigned)
//   user: UserSigned;

//   @ApiProperty()
//   @IsString()
//   @IsNotEmpty()
//   access_token: string;
// }
