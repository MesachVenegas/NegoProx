import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailResponseDto {
  @ApiProperty({ example: 'Email confirmed' })
  message: string;
}

export class VerifyEmailErrorResponseDto {
  @ApiProperty({ example: 'Token expired' })
  message: string;
  @ApiProperty({ example: 'Conflict' })
  error: string;
  @ApiProperty({ example: 409 })
  statusCode: number;
}
