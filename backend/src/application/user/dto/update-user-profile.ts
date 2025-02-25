import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  @IsUrl()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bio?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
