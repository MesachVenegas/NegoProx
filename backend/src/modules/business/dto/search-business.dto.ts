import { PaginationDto } from '@/shared/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchBusinessDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'Pizza Hut' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Pizzeria' })
  @IsOptional()
  @IsString()
  category?: string;
}
