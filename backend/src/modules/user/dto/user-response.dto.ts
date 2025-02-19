import { Role, TRole } from '@/shared/constants/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEnum, IsString } from 'class-validator';

export class ResponseUserDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;
  @ApiProperty({ example: 'John' })
  @IsString()
  name: string;
  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;
  @ApiProperty({ example: 'johndoe@example.com' })
  @IsString()
  email: string;
  @ApiProperty({ example: true })
  @IsBoolean()
  emailVerified: boolean;
  @ApiProperty({ example: '1234567890' })
  @IsString()
  phone?: string | null;
  @ApiProperty({ example: false })
  @IsBoolean()
  isDisabled: boolean;
  @ApiProperty({ example: Role.USER })
  @IsEnum(Role)
  userType: TRole;
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  registerAt: Date;
}
