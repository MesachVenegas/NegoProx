import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class SearchBusinessDto {
  @ApiProperty({ required: false, example: '1' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ required: false, example: 'Pizza Hut' })
  @IsOptional()
  @IsString()
  name?: string;
  @ApiProperty({ required: false, example: '112.232132' })
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }: { value: unknown }) =>
    value instanceof Decimal ? value.toNumber() : value,
  )
  latitude?: number;
  @ApiProperty({ required: false, example: '-77.232132' })
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }: { value: unknown }) =>
    value instanceof Decimal ? value.toNumber() : value,
  )
  longitude?: number;
}
