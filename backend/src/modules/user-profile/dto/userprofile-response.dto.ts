import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class UserProfileResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;
  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  @IsString()
  profilePicture: string | null;
  @ApiProperty({ example: 'My bio' })
  @IsString()
  bio: string | null;
  @ApiProperty({ example: '123 Main St, Anytown, USA' })
  @IsString()
  address: string | null;
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  createdAt: Date;
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<UserProfileResponseDto>) {
    this.id = partial.id ?? '';
    this.profilePicture = partial.profilePicture ?? null;
    if (partial.bio) this.bio = partial.bio;
    if (partial.address) this.address = partial.address;
    this.createdAt = partial.createdAt ?? new Date();
    this.updatedAt = partial.updatedAt ?? new Date();
  }
}
