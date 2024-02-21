import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { ChatsService } from 'src/chats/chats.service'
import { RoomGateway } from 'src/room/room.gateway'

interface IMessage {
  userId: string
  message: string
}

@WebSocketGateway()
export class ChatGroupGateway extends RoomGateway {
  constructor(private readonly chatsService: ChatsService) {
    super()
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(client: Socket, payload: IMessage) {
    const { roomId } = this.visited.get(client)
    const { userId, message } = payload

    const chat = await this.chatsService.createChat({
      userId,
      createChatDto: {
        message
      }
    })

    this.server.to(roomId).emit('receive-message', {
      user: {
        id: chat.user.id,
        name: chat.user.username,
        avatar: chat.user.avatar
      },
      message: chat.message,
      created_at: chat.created_at
    })
  }
}
