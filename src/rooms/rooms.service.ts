import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from 'database/entities/room.entity'
import { Repository } from 'typeorm'
import { CreateRoomDto } from './dto/create-room.dto'
import { Role } from 'common/enums/users.enum'
import { UsersService } from 'src/users/users.service'
import { JoinRoomDto } from './dto/join-room.dto'

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomsService: Repository<Room>,
    private readonly usersService: UsersService
  ) {}

  async createRoom({
    userId,
    userRole,
    createRoomDto
  }: {
    userId: string
    userRole: Role
    createRoomDto: CreateRoomDto
  }) {
    try {
      // Update role if role is USER (change to host)
      if (userRole === Role.USER) {
        await this.usersService.updateUserById({
          id: userId,
          payload: {
            role: Role.HOST
          }
        })
      }
      // Save room
      const room = await this.roomsService.save({
        ...createRoomDto,
        host_user_id: userId
      })

      return room
    } catch (error) {
      throw error
    }
  }

  async joinRoom({ userId, joinRoomDto }: { userId: string; joinRoomDto: JoinRoomDto }) {
    try {
      // Check room exists
      const room = await this.roomsService.findOneBy({ id: joinRoomDto.room_id })
      if (!room) throw new NotFoundException('Room not found')

      // Update relationship
      await this.usersService.updateUserById({
        id: userId,
        payload: {
          room: room
        }
      })
    } catch (error) {
      throw error
    }
  }
}
