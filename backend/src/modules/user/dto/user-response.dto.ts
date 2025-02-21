import { Role, TRole } from '@/shared/constants/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsString } from 'class-validator';

@Exclude()
export class ResponseUserDto {
  @ApiProperty({ example: '1' })
  @Expose()
  @IsString()
  id: string;

  @ApiProperty({ example: 'John' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Doe' })
  @Expose()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @Expose()
  @IsString()
  email: string;

  @ApiProperty({ example: true })
  @Expose()
  @IsBoolean()
  emailVerified: boolean;

  @ApiProperty({ example: '1234567890' })
  @Expose()
  @IsString()
  phone?: string | null;

  @ApiProperty({ example: false })
  @Expose()
  @IsBoolean()
  isDisabled: boolean;

  @ApiProperty({ example: Role.USER })
  @Expose()
  @IsEnum(Role)
  userType: TRole;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @Expose()
  @IsDate()
  registerAt: Date;
}
