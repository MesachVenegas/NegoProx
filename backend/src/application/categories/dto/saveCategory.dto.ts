import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { IsBase64Svg } from '@/shared/decorators/IsBase64Svg.decorator';

export class SaveCategoryDto {
  @ApiProperty({ example: 'Peluquería' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Hairdresser' })
  @IsString()
  @IsNotEmpty()
  en_name: string;

  @ApiProperty({ example: 'data:image/svg+xml;base64,...' })
  @IsString()
  @IsBase64Svg({ message: 'svg_icon must be a valid base64 encoded SVG image' })
  @IsNotEmpty()
  svg_icon: string;
}
