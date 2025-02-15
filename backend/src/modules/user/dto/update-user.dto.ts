import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
