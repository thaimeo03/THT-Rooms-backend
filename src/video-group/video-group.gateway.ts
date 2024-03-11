import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { IPayLoad } from 'src/room/room.gateway'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class VideoGroupGateway {
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
