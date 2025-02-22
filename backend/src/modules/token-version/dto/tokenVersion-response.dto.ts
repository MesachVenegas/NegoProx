import { ResponseUserDto } from '@/modules/user/dto/user-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class TokenVersionDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  version: number;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @IsDate()
  updatedAt: Date;

  @Exclude()
  @IsString()
  userId: string;

  @Exclude()
  @Type(() => ResponseUserDto)
  user?: ResponseUserDto;
}
