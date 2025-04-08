import {
  IsDate,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { WorkResponseDto } from '@/infrastructure/dto/work/res-work.dto';
import { ReviewUserWithProfileDto } from '@/infrastructure/dto/user/user-response.dto';
import { BusinessResponseDto } from '@/infrastructure/dto/business/business-response.dto';

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

  @ApiPropertyOptional({ type: ReviewUserWithProfileDto })
  @Type(() => ReviewUserWithProfileDto)
  @ValidateNested({ each: true })
  client?: ReviewUserWithProfileDto;

  @ApiProperty({ example: '1' })
  @IsString()
  businessId: string;

  @ApiPropertyOptional({ type: BusinessResponseDto })
  @Type(() => BusinessResponseDto)
  @ValidateNested({ each: true })
  business?: BusinessResponseDto;
}
