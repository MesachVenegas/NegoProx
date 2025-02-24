import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsString, ValidateNested } from 'class-validator';

import { Status } from '@/domain/constants/status.enum';
import { WorkResponseDto } from '@/infrastructure/dto/work/res-work.dto';
import { BusinessServicesResponseDto } from '../business-service/services-response.dto';
import { BusinessResponseDto } from '@/infrastructure/dto/business/business-response.dto';
import { UserProfileResponseDto } from '@/infrastructure/dto/user-profile/userprofile-response.dto';

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
