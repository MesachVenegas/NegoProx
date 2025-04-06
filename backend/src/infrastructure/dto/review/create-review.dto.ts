import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @Type(() => Number)
  @IsNumber()
  rate: number;

  @ApiProperty({
    example: 'Great service!',
    minLength: 10,
  })
  @IsString()
  comment: string;

  @ApiProperty({
    example: '1234567890',
  })
  @IsString()
  clientId: string;

  @ApiProperty({
    example: '1234567890',
  })
  @IsString()
  workId: string;

  @ApiProperty({
    example: '1234567890',
  })
  @IsString()
  businessId: string;
}
