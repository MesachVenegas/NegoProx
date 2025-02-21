import { Type } from 'class-transformer';
import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

@ApiExtraModels()
export class PaginationResponseDto<T> {
  @ApiProperty({ example: 3 })
  @IsInt()
  pages: number = 1;
  @ApiProperty({ example: 1, nullable: true })
  @IsInt()
  prev: number | null;
  @ApiProperty({ example: 3, nullable: true })
  @IsInt()
  next: number | null;
  @ApiProperty({ example: 10 })
  @IsInt()
  limit: number;
  @ApiProperty({ isArray: true })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  data: T;
}

export class PaginationDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public page?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public limit?: number;

  @ApiPropertyOptional({ example: 'desc' })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  public order?: 'asc' | 'desc';
}
