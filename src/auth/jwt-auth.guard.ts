import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { ROLES_KEY } from 'common/decorators/ROLEs.decorator'
import { ROLE } from 'common/enums/users.enum'
import { RolesService } from 'src/roles/roles.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly rolesService: RolesService
  ) {
    super()
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }

    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) {
      return user
    }

    // Check role user
    if (!this.rolesService.isVerified({ user, roleNames: requiredRoles })) {
      throw new ForbiddenException()
    }

    return user
  }
}
