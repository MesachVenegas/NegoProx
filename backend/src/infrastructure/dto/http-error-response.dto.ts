import { ApiProperty } from '@nestjs/swagger';

export class IMessageError {
  @ApiProperty({ example: 'Error message here' })
  message: string;
  @ApiProperty({ example: 'BAD_REQUEST' })
  error: string;
  @ApiProperty({ example: 400 })
  statusCode: number;
  @ApiProperty({
    example: 'Detailed error message if available',
    required: false,
  })
  cause?: string;
}

export class HttpErrorResponseDto {
  @ApiProperty({ type: IMessageError })
  error: string;
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  timestamp: Date;
}
