import { Module } from '@nestjs/common';
import { FertilizersService } from './fertilizers.service';
import { FertilizersController } from './fertilizers.controller';

@Module({
  providers: [FertilizersService],
  controllers: [FertilizersController]
})
export class FertilizersModule {}
