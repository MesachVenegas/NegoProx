import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsObject, IsString, IsUrl } from 'class-validator';

export class BusinessProfileDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'https://example.com/banner.jpg' })
  @IsUrl()
  bannerImage?: string;

  @ApiProperty({ example: 'https://example.com' })
  @IsUrl()
  website?: string;

  @ApiProperty({
    example: {
      facebook: 'https://www.facebook.com/example',
      instagram: 'https://www.instagram.com/example',
    },
  })
  @IsObject()
  socialMedia?: object;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  updatedAt: Date;
}
