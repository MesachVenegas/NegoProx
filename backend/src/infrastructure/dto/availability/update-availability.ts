import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class UpdateAvailabilityDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(6)
  dayOfWeek?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: 'Invalid time format, must be HH:mm',
  })
  startTime?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: 'Invalid time format, must be HH:mm',
  })
  endTime?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  serviceId?: string;
}
