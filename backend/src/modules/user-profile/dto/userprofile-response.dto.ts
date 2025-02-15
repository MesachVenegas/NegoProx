import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponseDto {
  @ApiProperty({ example: '1' })
  id: string;
  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  profilePicture?: string;
  @ApiProperty({ example: 'My bio' })
  bio?: string;
  @ApiProperty({ example: '123 Main St, Anytown, USA' })
  address?: string;
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;

  constructor(partial: Partial<UserProfileResponseDto>) {
    this.id = partial.id ?? '';
    if (partial.profilePicture) this.profilePicture = partial.profilePicture;
    if (partial.bio) this.bio = partial.bio;
    if (partial.address) this.address = partial.address;
    this.createdAt = partial.createdAt ?? new Date();
    this.updatedAt = partial.updatedAt ?? new Date();
  }
}
