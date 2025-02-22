import {
  IsDate,
  IsObject,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { BusinessResponseDto } from '@/modules/business/dto/business-response.dto';

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

  @ApiProperty({ example: '1' })
  @IsString()
  businessId: string;

  @ApiPropertyOptional({ type: BusinessResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BusinessResponseDto)
  business?: BusinessResponseDto;
}
