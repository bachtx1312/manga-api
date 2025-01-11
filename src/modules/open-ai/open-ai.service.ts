import { ENV } from '@/core/configs/system';
import { ChatGroq } from '@langchain/groq';
import { Injectable } from '@nestjs/common';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import {
  PGVectorStore,
  DistanceStrategy,
} from '@langchain/community/vectorstores/pgvector';
import { OpenAIEmbeddings } from '@langchain/openai';

@Injectable()
export class OpenAiService {
  openAiClient = new ChatGroq({
    apiKey: ENV.OPEN_AI.SECRET_KEY,
  });

  async chat() {
    // const embeddings = new OpenAIEmbeddings({
    //   model: 'text-embedding-3-small',
    // });
    // const vectorStore = await PGVectorStore.initialize(embeddings, config);
    // const conversationChain = new Conversat();
    // const message = new HumanMessage('i have 2 apples');
    // const messageAi = new AIMessage('ok');
    // const message2 = new HumanMessage('how many apple?');
    // const chatCompletion = await this.openAiClient.invoke([
    //   message,
    //   messageAi,
    //   message2,
    // ]);
    // return chatCompletion;
  }
}
