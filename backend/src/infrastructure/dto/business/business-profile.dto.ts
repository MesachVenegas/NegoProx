import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BusinessResponseDto } from './business-response.dto';
import { BusinessProfileDto } from './profile-response.dto';
import { BusinessImageResponseDto } from './images-response.dto';
import { BusinessServicesResponseDto } from './services-response.dto';
import { BusinessCategoryResponseDto } from './categories-response.dto';

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
