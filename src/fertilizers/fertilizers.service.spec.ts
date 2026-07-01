import { Test, TestingModule } from '@nestjs/testing';
import { FertilizersService } from './fertilizers.service';

describe('FertilizersService', () => {
  let service: FertilizersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FertilizersService],
    }).compile();

    service = module.get<FertilizersService>(FertilizersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
