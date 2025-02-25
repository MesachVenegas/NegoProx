import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateUserProfile {
  @ApiProperty({ required: false, example: 'https://example.com/profile.jpg' })
  @IsOptional()
  @IsString()
  @IsUrl()
  profilePicture?: string;
  @ApiProperty({ required: false, example: 'My bio' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bio?: string;
  @ApiProperty({ required: false, example: '123 Main St, Anytown, USA' })
  @IsOptional()
  @IsString()
  address?: string;
}

export class UpdateUserDto {
  @ApiProperty({ required: false, example: 'John' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;
  @ApiProperty({ required: false, example: 'Doe' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  lastName?: string;
  @ApiProperty({ required: false, example: 'johndoe@example.com' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
  @ApiProperty({ required: false, example: '1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ type: UpdateUserProfile })
  @IsOptional()
  @Type(() => UpdateUserProfile)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  userProfile?: UpdateUserProfile;
}

export class UpdateUserPasswordDto {
  @ApiProperty({ example: 'mySecurePass123' })
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[\d\W]).{6,}$/, {
    message:
      'password must be at least 6 characters and contain at least one letter and one number or special character',
  })
  password: string;
}
