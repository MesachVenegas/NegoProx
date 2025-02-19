import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class BusinessServicesResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Pizza Delivery' })
  @IsString()
  name: string;

  @ApiProperty({ example: 10.99 })
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 'Deliver pizza to your doorstep' })
  @IsString()
  description: string;

  @ApiProperty({ example: 30 })
  @IsNumber()
  time: number;
}
