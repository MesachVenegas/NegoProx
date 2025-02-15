import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';

import { ResponseUserDto } from './user-response.dto';
import { AccountResponseDto } from '@/modules/account/dto/account-response.dto';
import { UserProfileResponseDto } from '@/modules/user-profile/dto/userprofile-response.dto';

export class UserProfileAccDto extends ResponseUserDto {
  @ApiProperty({ type: UserProfileResponseDto, nullable: true })
  @IsObject()
  @ValidateNested()
  @Type(() => UserProfileResponseDto)
  userProfile: UserProfileResponseDto | null;

  @ApiProperty({ type: [AccountResponseDto], nullable: true })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => AccountResponseDto)
  accounts: AccountResponseDto[] | null;

  constructor(partial: Partial<UserProfileAccDto>) {
    super(partial);
    this.userProfile = partial.userProfile
      ? new UserProfileResponseDto(partial.userProfile)
      : null;
    this.accounts = partial.accounts
      ? partial.accounts.map((a) => new AccountResponseDto(a))
      : null;
  }
}
