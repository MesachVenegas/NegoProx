import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { RegisterBusinessDto } from './register-local-business.dto';

export class UpdateBusinessDto extends RegisterBusinessDto {
  @ApiProperty({ example: 113.343532 })
  @IsNumber()
  latitude?: number;

  @ApiProperty({ example: -77.343532 })
  @IsNumber()
  longitude?: number;
}
