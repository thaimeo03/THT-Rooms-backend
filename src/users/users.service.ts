import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'database/entities/user.entity'
import { Repository } from 'typeorm'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersService: Repository<User>) {}

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

  async updateUserById({ id, payload }: { id: string; payload: Partial<User> }) {
    return this.usersService.update(id, payload)
  }

  async findUserById(id: string) {
    return this.usersService.findOne({ where: { id } })
  }

  async findUserByOAuthId(oauth_id: string) {
    return this.usersService.findOne({ where: { oauth_id } })
  }

  async findUserByEmail(email: string) {
    return this.usersService.findOne({ where: { email } })
  }
}
