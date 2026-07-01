import { Module } from '@nestjs/common';
import { CultivationsController } from './cultivations.controller';
import { CultivationsService } from './cultivations.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CultivationsController],
  providers: [CultivationsService],
  imports: [UsersModule],
  exports: [CultivationsService],
})
export class CultivationsModule { }
