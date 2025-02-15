import { Role, TRole } from '@/shared/constants/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({ example: '1' })
  id: string;
  @ApiProperty({ example: 'John' })
  name: string;
  @ApiProperty({ example: 'Doe' })
  lastName: string;
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;
  @ApiProperty({ example: true })
  emailVerified: boolean;
  @ApiProperty({ example: '1234567890' })
  phone?: string | null;
  @ApiProperty({ example: Role.USER })
  userType: TRole;
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  registerAt: Date;

  constructor(partial: Partial<ResponseUserDto>) {
    this.id = partial.id ?? '';
    this.name = partial.name ?? 'No Name';
    this.lastName = partial.lastName ?? 'No Last Name';
    this.email = partial.email ?? '';
    this.emailVerified = partial.emailVerified ?? false;
    if (partial.phone) this.phone = partial.phone;
    this.userType = partial.userType || Role.USER;
    this.registerAt = partial.registerAt ?? new Date();
  }
}
