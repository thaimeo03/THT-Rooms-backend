import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from 'database/entities/role.entity'
import { Repository } from 'typeorm'
import { CreateRoleDto } from './dto/create-role.dto'
import { User } from 'database/entities/user.entity'

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private readonly rolesService: Repository<Role>) {}

  async createRole({ user, createRoleDto }: { user: User; createRoleDto: CreateRoleDto }) {
    const roleExist = await this.findRoleByUser(user)
    if (!roleExist) {
      return await this.rolesService.save({ ...createRoleDto, user: user })
    } else {
      return roleExist
    }
  }

  async findRoleByUser(user: User) {
    return await this.rolesService.findOne({
      where: {
        user: user
      }
    })
  }

  async findRoleByRoomIdAndUserId({ roomId, userId }: { roomId: string; userId: string }) {
    return await this.rolesService.findOne({
      select: {
        id: true,
        name: true,
        room_id: true
      },
      where: {
        room_id: roomId,
        user: {
          id: userId
        }
      }
    })
  }

  async isVerified({ user, roleNames }: { user: User; roleNames: string[] }) {
    const role = await this.findRoleByUser(user)

    if (!role) {
      return false
    }

    return roleNames.includes(role.name)
  }

  async deleteRoleByRoomId(roomId: string) {
    return this.rolesService.delete({
      room_id: roomId
    })
  }
}
