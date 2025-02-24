import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

import { WorkResponseDto } from '@/infrastructure/dto/work/res-work.dto';
import { ResponseUserDto } from '@/infrastructure/dto/user/user-response.dto';
import { BusinessResponseDto } from '@/infrastructure/dto/business/business-response.dto';

export class PaymentResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 10.99 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'pending' })
  @IsString()
  status: string;

  @ApiProperty({ example: 'cash' })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ example: '123123908' })
  @IsString()
  transactionId?: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  timestamp: Date;

  @ApiProperty({ example: '221' })
  @IsString()
  workId: string;

  @ApiPropertyOptional({ type: WorkResponseDto })
  @Type(() => WorkResponseDto)
  @ValidateNested({ each: true })
  work?: WorkResponseDto;

  @ApiProperty({ example: '1' })
  @IsString()
  clientId: string;

  @ApiPropertyOptional({ type: ResponseUserDto })
  @Type(() => ResponseUserDto)
  @ValidateNested({ each: true })
  client?: ResponseUserDto;

  @ApiProperty({ example: '1' })
  @IsString()
  businessId: string;

  @ApiPropertyOptional({ type: BusinessResponseDto })
  @Type(() => BusinessResponseDto)
  @ValidateNested({ each: true })
  business?: BusinessResponseDto;
}
