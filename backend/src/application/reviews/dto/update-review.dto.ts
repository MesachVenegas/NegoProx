import { IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiProperty({ example: 5 })
  @IsNumber()
  rate: number;

  @ApiPropertyOptional({ example: 'Comment' })
  @IsString()
  @MinLength(10)
  comment?: string;
}
