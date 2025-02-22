import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsString, ValidateNested } from 'class-validator';

import { Status } from '@/shared/constants/status.enum';
import { WorkResponseDto } from '@/modules/work/dto/res-work.dto';
import { BusinessResponseDto } from '@/modules/business/dto/business-response.dto';
import { UserProfileResponseDto } from '@/modules/user-profile/dto/userprofile-response.dto';
import { BusinessServicesResponseDto } from '@/modules/business-services/dto/services-response.dto';

export class AppointmentResponseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  datetime: Date;

  @ApiProperty({ type: String, enum: Status })
  @IsEnum(Status)
  state: Status;

  @ApiPropertyOptional({ type: UserProfileResponseDto })
  @ValidateNested({ each: true })
  @Type(() => UserProfileResponseDto)
  client?: UserProfileResponseDto;

  @ApiPropertyOptional({ type: BusinessServicesResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BusinessServicesResponseDto)
  service?: BusinessServicesResponseDto;

  @ApiPropertyOptional({ type: BusinessResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BusinessResponseDto)
  business?: BusinessResponseDto;

  @ApiPropertyOptional({ type: WorkResponseDto })
  @ValidateNested({ each: true })
  @Type(() => WorkResponseDto)
  work?: WorkResponseDto;
}
