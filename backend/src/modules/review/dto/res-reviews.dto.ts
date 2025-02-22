import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { WorkResponseDto } from '@/modules/work/dto/res-work.dto';
import { ResponseUserDto } from '@/modules/user/dto/user-response.dto';
import { BusinessResponseDto } from '@/modules/business/dto/business-response.dto';

export class ResReviewsDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  rate: number;

  @ApiPropertyOptional({ example: 'Comment' })
  @IsString()
  @MinLength(10)
  comment?: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  reviewedAt: Date;

  @ApiProperty({ example: '1' })
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
