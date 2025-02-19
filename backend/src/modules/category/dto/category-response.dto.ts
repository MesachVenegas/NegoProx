import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ example: '1' })
  id: string;
  @ApiProperty({ example: 'Peluquería' })
  name: string;
}
