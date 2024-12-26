import { LoginDto, RegisterDto } from '@app/dto/auth';

export interface AuthServiceInterface {
  login(data: LoginDto): Promise<{ access_token: string }>;
  register(data: RegisterDto): Promise<{
    access_token: string;
    message: string;
  }>;
  requestPasswordReset(data: string): Promise<{ message: string }>;
}
