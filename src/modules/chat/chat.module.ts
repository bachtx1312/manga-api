import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manga } from '@/database/entites/manga.entity';
import { ChatService } from './chat.service';
import { OpenAiModule } from '../open-ai/open-ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Manga]), OpenAiModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
