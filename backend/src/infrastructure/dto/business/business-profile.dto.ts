import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { BusinessResponseDto } from './business-response.dto';
import { BusinessProfileDto } from './profile-response.dto';
import { BusinessImageResponseDto } from './images-response.dto';
import { BusinessServicesResponseDto } from './services-response.dto';
import { BusinessCategoryResponseDto } from './categories-response.dto';
import { IsNumber } from 'class-validator';
import { Availability } from '@/domain/entities/business';

export class BusinessProfileResponseDto extends BusinessResponseDto {
  @ApiProperty({ type: [BusinessImageResponseDto] })
  @Type(() => BusinessImageResponseDto)
  images?: BusinessImageResponseDto[];

  @ApiProperty({ type: [BusinessServicesResponseDto] })
  @Type(() => BusinessServicesResponseDto)
  services?: BusinessServicesResponseDto[];

  @ApiProperty({ type: BusinessProfileDto })
  @Type(() => BusinessProfileDto)
  businessProfile?: BusinessProfileDto;

  @ApiProperty({ type: [BusinessCategoryResponseDto] })
  @Type(() => BusinessCategoryResponseDto)
  categories?: BusinessCategoryResponseDto[];

  @ApiProperty({ type: [Availability] })
  @Type(() => Availability)
  availabilities?: Availability[];

  @ApiProperty({ example: '1' })
  @IsNumber()
  rating_average: number;
}
