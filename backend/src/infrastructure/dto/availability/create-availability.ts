import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateAvailabilityDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(6)
  dayOfWeek: number;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  businessId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  serviceId?: string;
}
