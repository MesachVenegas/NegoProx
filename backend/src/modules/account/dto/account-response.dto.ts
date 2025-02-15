import { ApiProperty } from '@nestjs/swagger';

export class AccountResponseDto {
  @ApiProperty({ example: '1' })
  id: string;
  @ApiProperty({ example: 'google' })
  provider: string;
  @ApiProperty({ example: '1234567890' })
  providerId: string;
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;

  constructor(partial: Partial<AccountResponseDto>) {
    this.id = partial.id ?? '';
    this.provider = partial.provider ?? '';
    this.providerId = partial.providerId ?? '';
    this.createdAt = partial.createdAt ?? new Date();
    this.updatedAt = partial.updatedAt ?? new Date();
  }
}
