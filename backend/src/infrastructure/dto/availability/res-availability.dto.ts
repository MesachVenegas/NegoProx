import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

import { BusinessResponseDto } from '../business/business-response.dto';
import { BusinessServicesResponseDto } from '../business-service/services-response.dto';

export class AvailabilityResponseDto {
  @ApiProperty({ example: '1123213-0213' })
  @IsString()
  id: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  dayOfWeek: number;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  startTime: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  endTime: Date;

  @ApiProperty({ example: '1' })
  @IsString()
  businessId: string;

  @ApiPropertyOptional({ type: BusinessResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BusinessResponseDto)
  business?: BusinessResponseDto;

  @ApiProperty({ example: '1' })
  @IsString()
  serviceId: string;

  @ApiPropertyOptional({ type: BusinessServicesResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BusinessServicesResponseDto)
  service?: BusinessServicesResponseDto;
}
