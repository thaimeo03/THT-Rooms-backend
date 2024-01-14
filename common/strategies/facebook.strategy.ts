import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-facebook'
import 'dotenv/config'
import { LoginUserDto } from 'src/users/dto/login-user.dto'

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_REDIRECT_URI,
      profileFields: ['emails', 'displayName', 'photos']
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: any): Promise<any> {
    const { name, picture, id } = profile._json
    const user = {
      username: name,
      avatar: picture.data.url,
      oauth_id: id
    } as LoginUserDto

    done(null, user)
  }
}
