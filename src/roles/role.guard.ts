import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from 'common/decorators/roles.decorator'
import { ROLE } from 'common/enums/users.enum'
import { IJwtPayload } from 'common/strategies/jwt.strategy'
import { Request } from 'express'
import { RolesService } from './roles.service'

// Require send room id in Parameters
// Because authorized user must be in room

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly rolesService: RolesService
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest<Request>()

    const roomId = request.params['room_id']
    const user = request.user as IJwtPayload

    const role = await this.rolesService.findRoleByRoomIdAndUserId({ roomId, userId: user.id })

    if (!role) {
      return false
    }

    return requiredRoles.includes(role.name as ROLE)
  }
}
