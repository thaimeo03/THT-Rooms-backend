import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from 'database/entities/room.entity'
import { Repository } from 'typeorm'
import { CreateRoomDto } from './dto/create-room.dto'
import { Role } from 'common/enums/users.enum'
import { UsersService } from 'src/users/users.service'

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
      return this.roomsService.save({
        ...createRoomDto,
        host_user_id: userId
      })
    } catch (error) {
      throw error
    }
  }
}
