import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { ResponseUserDto } from './user-response.dto';
import { AccountResponseDto } from '@/modules/account/dto/account-response.dto';
import { UserProfileResponseDto } from '@/modules/user-profile/dto/userprofile-response.dto';

export class UserProfileAccDto extends ResponseUserDto {
  @ApiProperty({ type: UserProfileResponseDto, nullable: true })
  @Type(() => UserProfileResponseDto)
  userProfile: UserProfileResponseDto | null;

  @ApiProperty({ type: [AccountResponseDto], nullable: true })
  @Type(() => AccountResponseDto)
  accounts: AccountResponseDto[] | null;
}
