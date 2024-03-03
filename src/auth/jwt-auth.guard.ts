import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { ROLES_KEY } from 'common/decorators/ROLEs.decorator'
import { ROLE } from 'common/enums/users.enum'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }

    const requiredROLEs = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredROLEs) {
      return user
    }

    if (!requiredROLEs.some((ROLE) => user.ROLE === ROLE)) {
      throw new ForbiddenException()
    }

    return user
  }
}
