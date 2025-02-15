import { Type } from 'class-transformer';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

@ApiExtraModels()
export class PaginationResponseDto<T> {
  @ApiProperty({ example: 1 })
  pages: number = 1;
  @ApiProperty({ example: null, nullable: true })
  prev: number | null;
  @ApiProperty({ example: null, nullable: true })
  next: number | null;
  @ApiProperty({ example: 10 })
  limit: number;
  @ApiProperty({ example: [] })
  data: T;
}

export class PaginationDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public page?: number = 1;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public limit?: number = 10;

  @ApiProperty({ example: 'registerAt', required: false })
  @IsOptional()
  @IsString()
  public sortBy?: string = 'registerAt';

  @ApiProperty({ example: 'desc', required: false })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  public order?: 'asc' | 'desc' = 'desc';
}
