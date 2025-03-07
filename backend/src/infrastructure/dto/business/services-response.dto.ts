import { BusinessProfileDto } from '@/infrastructure/dto/business/profile-response.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

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

  @ApiPropertyOptional({ example: 1 })
  @IsString()
  @Exclude()
  businessId?: string;

  @ApiPropertyOptional({ type: BusinessProfileDto })
  @Type(() => BusinessProfileDto)
  @ValidateNested({ each: true })
  business?: BusinessProfileDto;
}
