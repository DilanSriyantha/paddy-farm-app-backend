import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatbotMessageModel, UserModel } from 'src/generated/prisma/models';
import { RecommendationsService } from 'src/recommendations/recommendations.service';
import { constructContextInstruction, SYSTTEM_INSTRUCTION } from './constants';
import { UsersService } from 'src/users/users.service';
import { ChatDto, ChatResponse } from './chat.dto';
import { Sender } from 'src/generated/prisma/enums';

@Injectable()
export class ChatbotService {
    private readonly ai: GoogleGenAI;
    private readonly model: string;
    private readonly baseSystemInstruction: string;

    constructor(
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService,
        private readonly recommendationsService: RecommendationsService,
    ) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");

        this.ai = new GoogleGenAI({ apiKey });
        this.model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
        this.baseSystemInstruction = SYSTTEM_INSTRUCTION;
    }

    async getHistory(email: string): Promise<ChatbotMessageModel[]> {
        const user: UserModel = await this.usersService.findOneByEmail(email);

        return this.prisma.chatbotMessage.findMany({
            where: { userId: user.id }
        });
    }

    async chat(email: string, language: "en" | "si", chatDto: ChatDto): Promise<ChatResponse> {
        const user: UserModel = await this.usersService.findOneByEmail(email);

        const context = await this.buildContextInstruction(user, language);

        await this.storeMessage(user, chatDto.message, Sender.USER);

        const response = await this.ai.models.generateContent({
            model: this.model,
            contents: chatDto.message,
            config: {
                systemInstruction: `${this.baseSystemInstruction}\n${context}`,
                temperature: 0.5
            }
        });

        const reply = response.text || "I could not generate a response right now.";

        await this.storeMessage(user, reply, Sender.CHATBOT);

        return { reply };
    }

    private async buildContextInstruction(user: UserModel, language: "en" | "si"): Promise<string> {
        const cultivation = await this.prisma.cultivation.findFirstOrThrow({
            where: { status: "ACTIVE" }
        });
        const elapsedDays = this.recommendationsService.getDaysGone(cultivation);
        const chatHistory = await this.getHistory(user.email);
        const stage = this.recommendationsService.getStage(cultivation, 'en');

        const context = constructContextInstruction(user.name, cultivation, elapsedDays, stage.title, 120 - elapsedDays, chatHistory, language);

        return context;
    }

    private async storeMessage(user: UserModel, message: string, sender: Sender): Promise<ChatbotMessageModel> {
        const newMessage = await this.prisma.chatbotMessage.create({
            data: {
                userId: user.id,
                content: message,
                sender,
            }
        });

        return newMessage;
    }
}
