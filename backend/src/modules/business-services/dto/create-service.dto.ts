import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Pizza Delivery' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 10.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiPropertyOptional({ example: 'Deliver pizza to your doorstep' })
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @IsNotEmpty()
  time: number;
}
