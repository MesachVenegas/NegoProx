import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ example: 'asd123' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Peluquería' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Peluquería' })
  @IsString()
  en_name: string;

  @ApiProperty({ example: 'data:image/svg+xml;base64, adklsj...  ' })
  @IsString()
  @IsBase64()
  svg_icon: string;
}
