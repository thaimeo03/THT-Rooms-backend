import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import 'dotenv/config'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh_token') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractRefreshTokenFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_REFRESH_TOKEN,
      passReqToCallback: true
    })
  }

  private static extractRefreshTokenFromCookie(req: Request) {
    if (req.cookies && 'refresh_token' in req.cookies) {
      return req.cookies.refresh_token
    }

    return null
  }

  validate(req: Request, payload: any) {
    const user = {
      payload,
      refreshToken: req.cookies.refresh_token
    }

    return user
  }
}
