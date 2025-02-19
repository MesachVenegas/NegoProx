import { RegisterLocalUserDto } from '@/modules/user/dto/register-local-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
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

  @ApiProperty({ type: RegisterLocalUserDto })
  @IsNotEmpty()
  @Type(() => RegisterLocalUserDto)
  @ValidateNested({ each: true })
  user: RegisterLocalUserDto;
}
