import { Test, TestingModule } from '@nestjs/testing';
import { TokenVersionService } from './token-version.service';

describe('TokenVersionService', () => {
  let service: TokenVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenVersionService],
    }).compile();

    service = module.get<TokenVersionService>(TokenVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
