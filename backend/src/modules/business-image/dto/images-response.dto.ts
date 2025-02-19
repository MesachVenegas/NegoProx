import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUrl } from 'class-validator';

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
}
