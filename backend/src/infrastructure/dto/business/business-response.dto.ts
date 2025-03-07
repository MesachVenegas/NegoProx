import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUrl } from 'class-validator';

@Exclude()
export class BusinessResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  @Expose()
  id: string;

  @ApiProperty({ example: 'Pizza Hut' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ example: 'Pizza Hut, best pizza in the world' })
  @IsString()
  @Expose()
  description?: string;

  @ApiProperty({ example: '112 Main St, Anytown, USA' })
  @IsString()
  @Expose()
  address?: string;

  @ApiProperty({ example: '112.232132' })
  @Type(() => Number)
  @Expose()
  latitude?: number;

  @ApiProperty({ example: '-77.232132' })
  @Type(() => Number)
  @Expose()
  longitude?: number;

  @ApiProperty({ example: '+551234567890' })
  @IsString()
  @Expose()
  phone?: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  @IsString()
  @IsUrl()
  @Expose()
  imgProfile?: string;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  @Expose()
  updatedAt: Date;
}
