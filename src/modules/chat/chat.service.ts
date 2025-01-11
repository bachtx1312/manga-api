import { Manga } from '@/database/entites/manga.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpenAiService } from '../open-ai/open-ai.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Manga)
    private mangasRepository: Repository<Manga>,
    private _openAiService: OpenAiService,
  ) {}

  async findAll(): Promise<Manga[]> {
    const count = await this.mangasRepository.count();
    console.log(count);

    return this.mangasRepository.find();
  }

  async chat() {
    return this._openAiService.chat();
  }
}
