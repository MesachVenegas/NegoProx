import { Role } from '@/domain/constants/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

class UserSigned {
  @ApiProperty({ example: '1123210934802932' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  @IsUrl()
  picture: string;

  @ApiProperty({ example: Role.USER })
  @IsEnum(Role)
  role: Role;
}
export class AuthResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UserSigned)
  user: UserSigned;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
