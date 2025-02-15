import { ApiProperty } from '@nestjs/swagger';

export class IMessageError {
  @ApiProperty({ example: 'Bad Request' })
  message: string;
  @ApiProperty({ example: 'BAD_REQUEST' })
  error: string;
  @ApiProperty({ example: 'Detailed error message', required: false })
  cause?: string;
}

export class HttpErrorResponseDto {
  @ApiProperty({ type: IMessageError })
  error: string;
  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  timestamp: Date;
}
