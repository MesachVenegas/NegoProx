import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsString, ValidateNested } from 'class-validator';

import { Status } from '@/shared/constants/status.enum';
import { ResReviewsDto } from '@/modules/review/dto/res-reviews.dto';
import { ResponseUserDto } from '@/modules/user/dto/user-response.dto';
import { PaymentResponseDto } from '@/modules/payment/dto/res-payment.dto';
import { BusinessResponseDto } from '@/modules/business/dto/business-response.dto';
import { AppointmentResponseDto } from '@/modules/appointment/dto/res-appointment.dto';

export class WorkResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Delivery' })
  @IsString()
  description: string;

  @ApiProperty({ type: String, enum: Status })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  initDate: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  endDate: Date;

  @ApiPropertyOptional({ example: '1' })
  @IsString()
  clientId?: string;

  @ApiPropertyOptional({ type: ResponseUserDto })
  @Type(() => ResponseUserDto)
  @ValidateNested({ each: true })
  client?: ResponseUserDto;

  @ApiPropertyOptional({ example: '1' })
  @IsString()
  businessId?: string;

  @ApiPropertyOptional({ type: BusinessResponseDto })
  @Type(() => BusinessResponseDto)
  @ValidateNested({ each: true })
  business?: BusinessResponseDto;

  @ApiPropertyOptional({ example: '1' })
  @IsString()
  appointmentId?: string;

  @ApiPropertyOptional({ type: AppointmentResponseDto })
  @Type(() => AppointmentResponseDto)
  @ValidateNested({ each: true })
  appointment?: AppointmentResponseDto;

  @ApiPropertyOptional({ type: PaymentResponseDto })
  @Type(() => PaymentResponseDto)
  @ValidateNested({ each: true })
  payment?: PaymentResponseDto;

  @ApiPropertyOptional({ type: ResReviewsDto })
  @ValidateNested({ each: true })
  @Type(() => ResReviewsDto)
  review?: ResReviewsDto;
}
