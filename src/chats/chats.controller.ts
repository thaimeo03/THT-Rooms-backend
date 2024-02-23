import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { ChatsService } from './chats.service'
import { Request } from 'express'
import { IJwtPayload } from 'common/strategies/jwt.strategy'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('room/:room_id')
  @UseGuards(JwtAuthGuard)
  async getChats(@Param('room_id') roomId: string, @Req() req: Request) {
    const user = req.user as IJwtPayload

    return this.chatsService.getAllChats({ roomId, userId: user.id })
  }
}
