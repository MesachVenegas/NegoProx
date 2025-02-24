import { Module } from '@nestjs/common';

import { UserController } from '@infrastructure/controllers/user.controller';
import { UserPrismaRepository } from '../repositories/user.repository';

@Module({
  providers: [UserPrismaRepository],
  controllers: [UserController],
  exports: [UserPrismaRepository],
})
export class UserModule {}
