import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { ResponseUserDto } from '@/modules/user/dto/user-response.dto';
import { TokenVersionDto } from '@/modules/token-version/dto/tokenVersion-response.dto';
import { UserProfileResponseDto } from '@/modules/user-profile/dto/userprofile-response.dto';

export class AuthUserDto extends ResponseUserDto {
  @ApiProperty({ type: TokenVersionDto })
  @Type(() => TokenVersionDto)
  tokenVersion: TokenVersionDto;

  @ApiProperty({ type: UserProfileResponseDto })
  @Type(() => UserProfileResponseDto)
  userProfile: UserProfileResponseDto;
}
