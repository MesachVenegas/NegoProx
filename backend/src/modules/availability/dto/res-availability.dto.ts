import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

import { Business } from '@/modules/business/business.entity';
import { Service } from '@/modules/business-services/business-service.entity';

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

  @ApiPropertyOptional({ type: Business })
  @ValidateNested({ each: true })
  @Type(() => Business)
  business?: Business;

  @ApiProperty({ example: '1' })
  @IsString()
  serviceId: string;

  @ApiPropertyOptional({ type: Service })
  @ValidateNested({ each: true })
  @Type(() => Service)
  service?: Service;
}
