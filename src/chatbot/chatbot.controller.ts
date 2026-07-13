import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import type { Request } from 'express';
import type { ChatDto, ChatResponse } from './chat.dto';
import { ChatbotMessage } from 'src/generated/prisma/client';

@Controller('api/v1/chatbot')
export class ChatbotController {
    constructor(
        private readonly chatbotService: ChatbotService
    ) { }

    @Get("/history")
    async getHistory(
        @Req() req: Request,
    ): Promise<ChatbotMessage[]> {
        const user = req["user"];
        return this.chatbotService.getHistory(user["email"]);
    }

    @Post("/chat")
    async chat(
        @Req() req: Request,
        @Query("language") language: "en" | "si",
        @Body() chatDto: ChatDto,
    ): Promise<ChatResponse> {
        const user = req["user"];
        return this.chatbotService.chat(user["email"], language, chatDto);
    }
}
