import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

export interface IPayLoad {
  roomId: string
  myPeerId: string
}

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  public readonly visited = new Map<Socket, IPayLoad>()

  @WebSocketServer()
  server: Server

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, payload: IPayLoad) {
    const { roomId, myPeerId } = payload
    console.log(`a new user ${myPeerId} joined room ${roomId}`)

    this.visited.set(client, { roomId, myPeerId })

    client.join(roomId)
    client.broadcast.to(roomId).emit('user-connected', myPeerId)
  }

  @SubscribeMessage('user-leave')
  handleLeaveRoom(client: Socket, payload: IPayLoad) {
    const { roomId, myPeerId } = payload

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

  handleDisconnect(client: Socket) {
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
