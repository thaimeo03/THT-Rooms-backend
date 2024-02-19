import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { RoomGateway } from 'src/room/room.gateway'

interface IMessage {
  text: string
}

@WebSocketGateway()
export class ChatGroupGateway extends RoomGateway {
  @SubscribeMessage('send-message')
  handleSendMessage(client: Socket, payload: IMessage) {
    const { roomId } = this.visited.get(client)
    // Continue here
  }
}
