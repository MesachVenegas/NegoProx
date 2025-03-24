import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { BusinessCategoryResponseDto } from '@/infrastructure/dto/business/categories-response.dto';
import { IsBase64Svg } from '@/shared/decorators/IsBase64Svg.decorator';

export class CategoryResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Peluquería' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Hairdresser' })
  @IsString()
  en_name: string;

  @ApiProperty({ example: 'data:image/png;base64,iVBORw0K...' })
  @IsString()
  @IsBase64Svg({ message: 'El formato de la imagen no es válido' })
  svg_icon: string;

  @ApiPropertyOptional()
  @ValidateNested({ each: true })
  @Type(() => BusinessCategoryResponseDto)
  businessCategories?: BusinessCategoryResponseDto[];
}
