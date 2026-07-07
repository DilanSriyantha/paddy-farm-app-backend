import { Test, TestingModule } from '@nestjs/testing';
import { DiseasePredictionController } from './disease-prediction.controller';

describe('DiseasePredictionController', () => {
  let controller: DiseasePredictionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiseasePredictionController],
    }).compile();

    controller = module.get<DiseasePredictionController>(DiseasePredictionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
