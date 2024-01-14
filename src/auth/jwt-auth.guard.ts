import { Injectable, UnauthorizedException } from '@nestjs/common'
import { TokenExpiredError } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    if (info instanceof TokenExpiredError) {
      // do stuff when token is expired
      console.log('token expired')
    } else if (err) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}
