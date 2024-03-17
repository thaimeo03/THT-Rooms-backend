import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { ChatsService } from 'src/chats/chats.service'
import { RolesService } from 'src/roles/roles.service'
import { RoomGateway } from 'src/rooms/room.gateway'
import { RoomsService } from 'src/rooms/rooms.service'

interface IMessage {
  userId: string
  message: string
}

@WebSocketGateway()
export class ChatGroupGateway extends RoomGateway {
  constructor(
    private readonly chatsService: ChatsService,
    public readonly roomsService: RoomsService,
    public readonly rolesService: RolesService
  ) {
    super(roomsService)
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(client: Socket, payload: IMessage) {
    const { roomId } = this.visited.get(client)
    const { userId, message } = payload

    const [chat, role] = await Promise.all([
      this.chatsService.createChat({
        userId,
        createChatDto: {
          message
        }
      }),
      this.rolesService.findRoleByRoomIdAndUserId({ roomId, userId })
    ])

    this.server.to(roomId).emit('receive-message', {
      id: chat.id,
      user: {
        id: chat.user.id,
        username: chat.user.username,
        avatar: chat.user.avatar,
        role: role.name
      },
      message: chat.message,
      created_at: chat.created_at
    })
  }
}
