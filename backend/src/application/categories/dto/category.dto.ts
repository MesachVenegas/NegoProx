import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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

  @ApiProperty({ example: 'HeartBeats' })
  @IsString()
  icon: string;
}
