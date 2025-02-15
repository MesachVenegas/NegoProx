import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class AccountResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;
  @ApiProperty({ example: 'google' })
  @IsString()
  provider: string;
  @ApiProperty({ example: '1234567890' })
  @IsString()
  providerId: string | null;
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  createdAt: Date;
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<AccountResponseDto>) {
    this.id = partial.id ?? '';
    this.provider = partial.provider ?? '';
    this.providerId = partial.providerId ?? '';
    this.createdAt = partial.createdAt ?? new Date();
    this.updatedAt = partial.updatedAt ?? new Date();
  }
}
