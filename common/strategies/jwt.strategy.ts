import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import 'dotenv/config'
import { ROLE } from 'common/enums/users.enum'

export interface IJwtPayload {
  id: string
  role: ROLE
  type: string
  iat: number
  exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_ACCESS_TOKEN
    })
  }

  private static extractJwtFromCookie(req: Request) {
    if (req.cookies && 'access_token' in req.cookies) {
      return req.cookies.access_token
    }
    return null
  }

  validate(payload: IJwtPayload) {
    return payload
  }
}
