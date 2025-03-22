import { Module } from '@nestjs/common';

import { UserController } from '@infrastructure/controllers/user.controller';
import { UserPrismaRepository } from '../repositories/user.repository';
import { UtilsService } from '../services/utils.service';

@Module({
  providers: [UserPrismaRepository, UtilsService],
  controllers: [UserController],
  exports: [UserPrismaRepository],
})
export class UserModule {}
