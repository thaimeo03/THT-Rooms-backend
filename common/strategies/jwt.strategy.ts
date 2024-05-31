import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import 'dotenv/config'

export interface IJwtPayload {
  id: string
  type: string
  iat: number
  exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    console.log('JwtStrategy::1')
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
      console.log('Check cookie:: ' + req.cookies.access_token)

      return req.cookies.access_token
    }
    return null
  }

  validate(payload: IJwtPayload) {
    return payload
  }
}
