import { Injectable, UnauthorizedException } from '@nestjs/common'
import { TokenExpiredError } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard(['access_token', 'refresh_token']) {
  handleRequest(err, payload, info: Error) {
    if (err) {
      throw err || new UnauthorizedException()
    }

    console.log(payload)

    return payload
  }
}
