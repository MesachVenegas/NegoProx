import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { ResponseUserDto } from './user-response.dto';
import { AccountResponseDto } from '@/infrastructure/dto/account/account-response.dto';
import { UserProfileResponseDto } from '@/infrastructure/dto/user-profile/userprofile-response.dto';

@Exclude()
export class UserProfileAccDto extends ResponseUserDto {
  @ApiProperty({ type: UserProfileResponseDto, nullable: true })
  @Type(() => UserProfileResponseDto)
  @Expose()
  userProfile: UserProfileResponseDto | null;

  @ApiProperty({ type: [AccountResponseDto], nullable: true })
  @Type(() => AccountResponseDto)
  @Expose()
  accounts: AccountResponseDto[] | null;
}
