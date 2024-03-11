import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from 'common/decorators/roles.decorator'
import { ROLE } from 'common/enums/users.enum'
import { IJwtPayload } from 'common/strategies/jwt.strategy'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    const request = context.switchToHttp().getRequest()
    const user = request.user as IJwtPayload

    console.log(user, requiredRoles)

    return true
  }
}
