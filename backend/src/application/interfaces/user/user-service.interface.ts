export interface UserServiceInterface {
  verifyToken(token: string): Promise<void>;
  renewPassword(token: string, newPassword: string): Promise<void>;
}
