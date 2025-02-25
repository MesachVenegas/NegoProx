import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { BusinessCategoryResponseDto } from '@/infrastructure/dto/business/categories-response.dto';

export class CategoryResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Peluquería' })
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @ValidateNested({ each: true })
  @Type(() => BusinessCategoryResponseDto)
  businessCategories?: BusinessCategoryResponseDto[];
}
