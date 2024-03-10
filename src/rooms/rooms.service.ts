import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from 'database/entities/room.entity'
import { Repository } from 'typeorm'
import { CreateRoomDto } from './dto/create-room.dto'
import { ROLE } from 'common/enums/users.enum'
import { UsersService } from 'src/users/users.service'
import { JoinRoomDto } from './dto/join-room.dto'
import { ChatsService } from 'src/chats/chats.service'
import { RolesService } from 'src/roles/roles.service'

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomsService: Repository<Room>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => ChatsService))
    private readonly chatsService: ChatsService,
    private readonly rolesService: RolesService
  ) {}

  async createRoom({ userId, createRoomDto }: { userId: string; createRoomDto: CreateRoomDto }) {
    try {
      // Save room
      const [user, room] = await Promise.all([
        this.usersService.findUserById(userId),
        this.roomsService.save({
          ...createRoomDto,
          host_user_id: userId
        })
      ])

      // Add role host
      await this.rolesService.createRole({
        user,
        createRoleDto: {
          name: ROLE.HOST,
          room_id: room.id
        }
      })

      return room
    } catch (error) {
      throw error
    }
  }

  async joinRoom({ userId, joinRoomDto }: { userId: string; joinRoomDto: JoinRoomDto }) {
    try {
      // Check room and role exists
      const [room, role, user] = await Promise.all([
        this.roomsService.findOneBy({ id: joinRoomDto.room_id }),
        this.rolesService.findRoleByRoomIdAndUserId({ roomId: joinRoomDto.room_id, userId }),
        this.usersService.findUserById(userId)
      ])
      if (!room) throw new NotFoundException('Room not found')
      // Assign role if not exists, default is role user
      if (!role) {
        await this.rolesService.createRole({
          user,
          createRoleDto: {
            name: ROLE.USER,
            room_id: joinRoomDto.room_id
          }
        })
      }

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

  async deleteRoomById(roomId: string) {
    const room = await this.findRoomById(roomId)
    if (!room) {
      throw new NotFoundException('Room not found')
    }

    await Promise.all([
      await this.chatsService.deleteChatByRoomId(roomId),
      await this.usersService.updateNullRoomOfUsers(roomId)
      // await this.rolesService.deleteRoleByRoomId(roomId)
    ])
    await this.roomsService.delete({ id: roomId })
  }

  async deleteRoomsByHostId(hostUserId: string) {
    try {
      await this.roomsService.delete({
        host_user_id: hostUserId
      })
    } catch (error) {
      throw error
    }
  }

  async leaveRoom(userId: string) {
    try {
      await Promise.all([
        await this.usersService.updateUserById({
          id: userId,
          payload: {
            room: null
          }
        })
      ])
    } catch (error) {
      throw error
    }
  }

  async findRoomById(roomId: string) {
    return this.roomsService.findOneBy({ id: roomId })
  }

  async findRoomsByHostId(hostUserId: string) {
    return this.roomsService.find({
      where: {
        host_user_id: hostUserId
      }
    })
  }

  async findRoomByUserId(userId: string) {
    return this.roomsService.findOneBy({ users: { id: userId } })
  }
}
