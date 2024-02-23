import { Controller, Get, Param } from '@nestjs/common'
import { ChatsService } from './chats.service'

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // Need add authGuard
  @Get(':room_id')
  async getChats(@Param('room_id') roomId: string) {
    return this.chatsService.getAllChatsByRoomId(roomId)
  }
}
