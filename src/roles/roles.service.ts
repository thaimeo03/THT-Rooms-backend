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
    const roleExist = await this.findRoleByName(user)
    if (!roleExist) {
      return await this.rolesService.save({ name: createRoleDto.name, user: user })
    } else {
      return roleExist
    }
  }

  async findRoleByName(user: User) {
    return await this.rolesService.findOne({
      where: {
        user: user
      }
    })
  }
}
