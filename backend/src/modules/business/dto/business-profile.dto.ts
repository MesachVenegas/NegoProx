import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BusinessResponseDto } from './business-response.dto';
import { BusinessProfileDto } from '@/modules/business-profile/dto/profile-response.dto';
import { BusinessImageResponseDto } from '@/modules/business-image/dto/images-response.dto';
import { BusinessServicesResponseDto } from '@/modules/business-services/dto/services-response.dto';
import { BusinessCategoryResponseDto } from '@/modules/business-category/dto/categories-response.dto';

export class BusinessProfileServiceDto extends BusinessResponseDto {
  @ApiProperty({ type: [BusinessImageResponseDto] })
  @Type(() => BusinessImageResponseDto)
  images: BusinessImageResponseDto[];

  @ApiProperty({ type: [BusinessServicesResponseDto] })
  @Type(() => BusinessServicesResponseDto)
  services: BusinessServicesResponseDto[];

  @ApiProperty({ type: BusinessProfileDto })
  @Type(() => BusinessProfileDto)
  businessProfile: BusinessProfileDto;

  @ApiProperty({ type: [BusinessCategoryResponseDto] })
  @Type(() => BusinessCategoryResponseDto)
  categories: BusinessCategoryResponseDto[];

  @ApiProperty({ example: 4.5 })
  @IsNumber()
  rate: number;
}
