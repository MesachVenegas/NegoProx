import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SaveCategoryDto {
  @ApiProperty({ example: 'Peluquería' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Hairdresser' })
  @IsString()
  @IsNotEmpty()
  en_name: string;

  @ApiProperty({ example: 'Sparkles' })
  @IsString()
  @IsNotEmpty()
  svg_icon: string;
}
