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
    const room = await this.roomsService.findRoomByUserId(userId)
    if (!room) throw new NotFoundException('User is not in a room')

    const chat = await this.chatsService.save({
      ...createChatDto,
      room,
      user
    })

    return chat
  }

  async getAllChats({ roomId, userId }: { roomId: string; userId: string }) {
    // Room exist and Need check user in a room
    const [room, roomByUser] = await Promise.all([
      await this.roomsService.findRoomById(roomId),
      await this.roomsService.findRoomByUserId(userId)
    ])
    if (!room || !roomByUser) throw new NotFoundException('Room not found')
    if (room.id !== roomByUser.id) throw new NotFoundException('User is not in a room')

    // Join room -> user -> chat
    const chats = await this.chatsService.find({
      select: {
        id: true,
        message: true,
        user: {
          id: true,
          username: true,
          avatar: true,
          role: true
        },
        created_at: true
      },
      where: {
        room: {
          id: roomId
        },
        user: {
          id: userId
        }
      },
      relations: {
        user: true
      }
    })

    return chats
  }
}
