import { Module } from '@nestjs/common';

import { UserService } from '@application/user/use-cases/user.service';
import { UserController } from '@infrastructure/controllers/user.controller';
import { UserRepository } from '@infrastructure/repositories/user.repository';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
