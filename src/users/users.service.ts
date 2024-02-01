import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'database/entities/user.entity'
import { FindOptionsSelect, Repository } from 'typeorm'
import { LoginUserDto } from './dto/login-user.dto'
import { RoomsService } from 'src/rooms/rooms.service'
import { Role } from 'common/enums/users.enum'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersService: Repository<User>,
    @Inject(forwardRef(() => RoomsService))
    private readonly roomsService: RoomsService
  ) {}

  async createUser(user: LoginUserDto) {
    try {
      return await this.usersService.save(user)
    } catch (error) {
      throw error
    }
  }

  async updateUser(user: Partial<User>) {
    try {
      return await this.usersService.update(user.id, user)
    } catch (error) {
      throw error
    }
  }

  async getProfile(id: string) {
    return this.findUserById(id, {
      id: true,
      username: true,
      email: true,
      avatar: true,
      updated_at: true,
      role: true
    })
  }

  async leaveHost(id: string) {
    try {
      Promise.all([
        await this.roomsService.deleteRoomsByHostId(id),
        await this.updateUserById({ id, payload: { role: Role.USER } })
      ])
    } catch (error) {
      throw error
    }
  }

  async updateUserById({ id, payload }: { id: string; payload: Partial<User> }) {
    return this.usersService.update(id, payload)
  }

  async findUserById(id: string, select?: FindOptionsSelect<User>) {
    return this.usersService.findOne({
      where: { id },
      select: select
    })
  }

  async findUserByOAuthId(oauth_id: string) {
    return this.usersService.findOne({ where: { oauth_id } })
  }

  async findUserByEmail(email: string) {
    return this.usersService.findOne({ where: { email } })
  }
}
