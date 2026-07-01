import { Test, TestingModule } from '@nestjs/testing';
import { FertilizersController } from './fertilizers.controller';

describe('FertilizersController', () => {
  let controller: FertilizersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FertilizersController],
    }).compile();

    controller = module.get<FertilizersController>(FertilizersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
