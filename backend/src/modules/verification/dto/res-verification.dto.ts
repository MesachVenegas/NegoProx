import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class VerificationResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  token: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @Type(() => Date)
  @IsString()
  tokenExp: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  used: boolean;

  @ApiProperty({ example: '1' })
  @IsString()
  userId: string;
}
