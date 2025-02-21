import { Test, TestingModule } from '@nestjs/testing';
import { BusinessServicesController } from './business-services.controller';

describe('BusinessServicesController', () => {
  let controller: BusinessServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessServicesController],
    }).compile();

    controller = module.get<BusinessServicesController>(BusinessServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
