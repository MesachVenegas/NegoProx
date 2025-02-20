import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { BusinessRepository } from './business.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  providers: [BusinessService, BusinessRepository, UserService, UserRepository],
  controllers: [BusinessController],
  exports: [BusinessService],
})
export class BusinessModule {}
