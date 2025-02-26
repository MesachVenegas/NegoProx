import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FilterServiceDto {
  @ApiProperty({ example: 'Pizza Delivery' })
  @IsString()
  name: string;

  @ApiProperty({ example: '1' })
  @IsString()
  businessId: string;
}
