import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';

import { BusinessResponseDto } from '@/modules/business/dto/business-response.dto';
import { CategoryResponseDto } from '@/modules/category/dto/category-response.dto';

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
