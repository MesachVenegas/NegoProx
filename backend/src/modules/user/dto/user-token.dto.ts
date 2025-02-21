import { TokenVersionDto } from '@/modules/token-version/dto/tokenVersion-response.dto';
import { ResponseUserDto } from './user-response.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserTokenVersionDto extends ResponseUserDto {
  @ApiProperty({ type: TokenVersionDto })
  @Type(() => TokenVersionDto)
  @Expose()
  tokenVersion: TokenVersionDto;
}
