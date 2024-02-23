import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Chat } from 'database/entities/chat.entity'
import { Repository } from 'typeorm'
import { CreateChatDto } from './dto/create-chat.dto'
import { RoomsService } from 'src/rooms/rooms.service'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private readonly chatsService: Repository<Chat>,
    private readonly roomsService: RoomsService,
    private readonly usersService: UsersService
  ) {}

  async createChat({ userId, createChatDto }: { userId: string; createChatDto: CreateChatDto }) {
    // Check if user exists
    const user = await this.usersService.findUserById(userId)
    if (!user) throw new NotFoundException('User not found')

    // TODO: Check if user is in the room
    console.log({ userId, createChatDto })
    const room = await this.roomsService.findRoomByUserId(userId)
    if (!room) throw new NotFoundException('User is not in a room')

    const chat = await this.chatsService.save({
      ...createChatDto,
      room,
      user
    })

    return chat
  }

  async getAllChatsByRoomId(roomId: string) {
    // Room exist and Need check user in a room
    // const room = await this.roomsService.findRoom
    // Join room -> user -> chat
    const chats = await this.chatsService.find({
      where: {
        user: {
          room: {
            id: roomId
          }
        }
      }
    })

    return chats
  }
}
