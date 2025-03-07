import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';

import { BusinessResponseDto } from '@/infrastructure/dto/business/business-response.dto';
import { CategoryResponseDto } from '@/infrastructure/dto/category/category-response.dto';

export class BusinessCategoryResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  businessId: string;

  @ApiProperty({ type: [BusinessResponseDto] })
  @ValidateNested({ each: true })
  @Type(() => BusinessResponseDto)
  business: BusinessResponseDto[];

  @ApiProperty({ example: '1' })
  @IsString()
  categoryId: string;

  @ApiProperty({ type: [CategoryResponseDto] })
  @ValidateNested({ each: true })
  @Type(() => CategoryResponseDto)
  category: CategoryResponseDto[];
}
