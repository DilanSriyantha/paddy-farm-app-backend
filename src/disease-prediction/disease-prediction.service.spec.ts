import { Test, TestingModule } from '@nestjs/testing';
import { DiseasePredictionService } from './disease-prediction.service';

describe('DiseasePredictionService', () => {
  let service: DiseasePredictionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiseasePredictionService],
    }).compile();

    service = module.get<DiseasePredictionService>(DiseasePredictionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
