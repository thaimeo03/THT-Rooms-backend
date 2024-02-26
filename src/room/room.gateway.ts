import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { RoomsService } from 'src/rooms/rooms.service'

export interface IPayLoad {
  roomId: string
  myPeerId: string
}

interface IJoinRoom extends IPayLoad {
  userId: string
}

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  public readonly visited = new Map<Socket, IJoinRoom>()

  constructor(public readonly roomsService: RoomsService) {}

  @WebSocketServer()
  server: Server

  @SubscribeMessage('join-room')
  async handleJoinRoom(client: Socket, payload: IJoinRoom) {
    const { roomId, myPeerId, userId } = payload
    console.log(`a new user ${myPeerId} joined room ${roomId}`)

    this.visited.set(client, { roomId, myPeerId, userId })
    await this.roomsService.joinRoom({ userId, joinRoomDto: { room_id: roomId } })

    client.join(roomId)
    client.broadcast.to(roomId).emit('user-connected', myPeerId)
  }

  @SubscribeMessage('user-leave')
  async handleLeaveRoom(client: Socket, payload: IPayLoad) {
    const { roomId, myPeerId } = payload

    await this.roomsService.leaveRoom(this.visited.get(client).userId)
    this.visited.delete(client)

    client.join(roomId)
    client.broadcast.to(roomId).emit('user-leave', myPeerId)
  }

  afterInit(server: Server) {
    console.log('Init')
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected: ${client.id}`)
  }

  async handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`)

    if (this.visited.has(client)) {
      const { myPeerId, roomId } = this.visited.get(client)

      this.handleLeaveRoom(client, {
        myPeerId,
        roomId
      })
    }
  }
}
