import { Module } from '@nestjs/common';
import { UserService } from '@infrastructure/services/user/user.service';
import { UserController } from '@presentation/controllers/user/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
