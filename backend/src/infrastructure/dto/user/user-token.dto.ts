import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { ResponseUserDto } from './user-response.dto';
import { TokenVersionDto } from '@/infrastructure/dto/token-version/tokenVersion-response.dto';

@Exclude()
export class UserTokenVersionDto extends ResponseUserDto {
  @ApiProperty({ type: TokenVersionDto })
  @Type(() => TokenVersionDto)
  @Expose()
  tokenVersion: TokenVersionDto;
}
