import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterLocalBusinessDto {
  @ApiProperty({ example: 'Pizza Hut' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    required: false,
    example: 'Pizza Hut, best pizza in the world',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '112 Main St, Anytown, USA' })
  @IsString()
  address: string;

  @ApiProperty({ example: '+112232132' })
  @IsString()
  @Matches(/^\+?\d{1,3}[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/, {
    message: 'Invalid phone number',
  })
  phone: string;

  @ApiProperty({ example: 'Johnson' })
  @IsString()
  @MinLength(3)
  ownerName: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  @MinLength(3)
  ownerLastName: string;

  @ApiProperty({ example: 'johnsmith@example.com' })
  @IsString()
  @IsEmail()
  ownerEmail: string;

  @ApiProperty({ example: 'SecurePass!' })
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[\d\W]).{6,}$/, {
    message:
      'password must be at least 6 characters and contain at least one letter and one number or special character',
  })
  ownerPassword: string;
}
