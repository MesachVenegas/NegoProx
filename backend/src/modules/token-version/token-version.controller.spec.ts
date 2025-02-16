import { Test, TestingModule } from '@nestjs/testing';
import { TokenVersionController } from './token-version.controller';

describe('TokenVersionController', () => {
  let controller: TokenVersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenVersionController],
    }).compile();

    controller = module.get<TokenVersionController>(TokenVersionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
