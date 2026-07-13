import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { RecommendationsModule } from 'src/recommendations/recommendations.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService],
  imports: [RecommendationsModule, UsersModule],
})
export class ChatbotModule { }
