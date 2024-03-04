import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ROLE } from 'common/enums/users.enum'
import { User } from 'database/entities/user.entity'
import { LoginUserDto } from 'src/users/dto/login-user.dto'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {}

  async register(user: LoginUserDto) {
    const newUser = await this.usersService.createUser(user)
    const { access_token, refresh_token } = await this.signAccessAndRefreshToken({ id: newUser.id })

    // Save refresh_token in DB
    await this.usersService.updateUser({ id: newUser.id, refresh_token })

    return { access_token, refresh_token }
  }

  async login(userExist: User) {
    const { access_token, refresh_token } = await this.signAccessAndRefreshToken({
      id: userExist.id
    })

    // Update refresh_token in DB
    await this.usersService.updateUser({ id: userExist.id, refresh_token })

    return { access_token, refresh_token }
  }

  async oauthLogin(user: LoginUserDto) {
    if (!user) {
      throw new NotFoundException('No user from third-party')
    }

    const userExist = await this.usersService.findUserByOAuthId(user.oauth_id)
    if (!userExist) {
      return this.register(user)
    }

    return this.login(userExist)
  }

  async refreshToken(payload: { id: string; refresh_token: string }) {
    const userExist = await this.usersService.findUserById(payload.id)

    if (!userExist) {
      throw new NotFoundException()
    }

    if (userExist.refresh_token !== payload.refresh_token) {
      throw new UnauthorizedException()
    }

    const access_token = await this.signAccessToken({ id: userExist.id })

    return access_token
  }

  async signAccessToken(payload: { id: string }) {
    return await this.jwtService.signAsync(
      { ...payload, type: 'ACCESS_TOKEN' },
      {
        secret: this.configService.get('JWT_SECRET_ACCESS_TOKEN'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN_ACCESS_TOKEN')
      }
    )
  }

  async signRefreshToken(payload: { id: string }) {
    return await this.jwtService.signAsync(
      { ...payload, type: 'REFRESH_TOKEN' },
      {
        secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN_REFRESH_TOKEN')
      }
    )
  }

  async signAccessAndRefreshToken(payload: { id: string }) {
    const [access_token, refresh_token] = await Promise.all([
      await this.signAccessToken(payload),
      await this.signRefreshToken(payload)
    ])

    return {
      access_token,
      refresh_token
    }
  }
}
