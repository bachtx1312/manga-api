import { Body, Controller, Post } from '@nestjs/common';
import { IMessageDetailRq } from './chat.interface';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private _chatService: ChatService) {}

  @Post('/')
  async chat(@Body() messageDetails: IMessageDetailRq) {
    console.log(messageDetails);
    return this._chatService.chat();
  }
}
