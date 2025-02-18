import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsString, IsUrl } from 'class-validator';

export class BusinessResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Pizza Hut' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Pizza Hut, best pizza in the world' })
  @IsString()
  description?: string;

  @ApiProperty({ example: '112 Main St, Anytown, USA' })
  @IsString()
  address?: string;

  @ApiProperty({ example: '112.232132' })
  @Type(() => Number)
  @Transform(({ value }: { value: unknown }) =>
    value instanceof Decimal ? value.toNumber() : value,
  )
  latitude?: number;

  @ApiProperty({ example: '-77.232132' })
  @Type(() => Number)
  @Transform(({ value }: { value: unknown }) =>
    value instanceof Decimal ? value.toNumber() : value,
  )
  longitude?: number;

  @ApiProperty({ example: '+551234567890' })
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  @IsString()
  @IsUrl()
  imgProfile?: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  updatedAt: Date;
}
