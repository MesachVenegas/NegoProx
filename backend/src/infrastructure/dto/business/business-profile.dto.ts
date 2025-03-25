import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Review } from '@/domain/entities/review';
import { AvailabilityResponseDto } from '../availability';
import { BusinessProfileDto } from './profile-response.dto';
import { BusinessResponseDto } from './business-response.dto';
import { BusinessImageResponseDto } from './images-response.dto';
import { BusinessServicesResponseDto } from './services-response.dto';
import { BusinessCategoryResponseDto } from './categories-response.dto';

export class BusinessProfileResponseDto extends BusinessResponseDto {
  @ApiProperty({ type: [BusinessImageResponseDto] })
  @Type(() => BusinessImageResponseDto)
  @ValidateNested({ each: true })
  images?: BusinessImageResponseDto[];

  @ApiProperty({ type: [BusinessServicesResponseDto] })
  @Type(() => BusinessServicesResponseDto)
  @ValidateNested({ each: true })
  services?: BusinessServicesResponseDto[];

  @ApiProperty({ type: [Review] })
  @Type(() => Review)
  @ValidateNested({ each: true })
  reviews?: Review[];

  @ApiProperty({ type: BusinessProfileDto })
  @Type(() => BusinessProfileDto)
  @ValidateNested({ each: true })
  businessProfile?: BusinessProfileDto;

  @ApiProperty({ type: [BusinessCategoryResponseDto] })
  @Type(() => BusinessCategoryResponseDto)
  @ValidateNested({ each: true })
  categories?: BusinessCategoryResponseDto[];

  @ApiProperty({ type: [AvailabilityResponseDto] })
  @Type(() => AvailabilityResponseDto)
  @ValidateNested({ each: true })
  availability?: AvailabilityResponseDto[];

  @ApiProperty({ example: 4.5 })
  @IsNumber()
  @Type(() => Number)
  rateAvg?: number;
}
