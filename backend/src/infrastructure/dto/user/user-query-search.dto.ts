import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QuerySearchUserDto {
  @ApiProperty({ required: false, example: '1' })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({ required: false, example: 'johndoe@example.com' })
  @IsOptional()
  @IsString()
  email?: string;
  @ApiProperty({ required: false, example: '1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;
}
