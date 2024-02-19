import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { IPayLoad, RoomGateway } from 'src/room/room.gateway'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class VideoGroupGateway extends RoomGateway {
  @SubscribeMessage('user-toggle-audio')
  handleToggleAudio(client: Socket, payload: IPayLoad) {
    const { roomId, myPeerId } = payload
    client.join(roomId)
    client.broadcast.to(roomId).emit('user-toggle-audio', myPeerId)
  }

  @SubscribeMessage('user-toggle-video')
  handleToggleVideo(client: Socket, payload: IPayLoad) {
    const { roomId, myPeerId } = payload
    client.join(roomId)
    client.broadcast.to(roomId).emit('user-toggle-video', myPeerId)
  }
}
