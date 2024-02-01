import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class VideoGroupGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  // constructor(private readonly ) {}

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, payload: { roomId: string; myId: string }) {
    const { roomId, myId } = payload
    console.log(`a new user ${myId} joined room ${roomId}`)

    // Handle join room
    // ...
    // End handle join room

    client.join(roomId)
    client.broadcast.to(roomId).emit('user-connected', myId)
  }

  @SubscribeMessage('user-leave')
  handleLeaveRoom(client: Socket, payload: { roomId: string; myId: string }) {
    const { roomId, myId } = payload
    client.join(roomId)
    client.broadcast.to(roomId).emit('user-leave', myId)
  }

  afterInit(server: Server) {
    console.log('Init')
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`)
  }
}
