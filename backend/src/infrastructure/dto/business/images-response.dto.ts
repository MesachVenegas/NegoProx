import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsUrl, ValidateNested } from 'class-validator';

import { BusinessResponseDto } from '@/infrastructure/dto/business/business-response.dto';

export class BusinessImageResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  @IsUrl()
  imageUrl: string;

  @ApiProperty({ example: 0 })
  @IsInt()
  order: number;

  @ApiProperty({ example: '1' })
  @IsString()
  businessId: string;

  @ApiPropertyOptional({ type: BusinessResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BusinessResponseDto)
  business?: BusinessResponseDto;
}
