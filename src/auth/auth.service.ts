import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Role } from 'common/enums/users.enum'
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
    const { access_token, refresh_token } = await this.signAccessAndRefreshToken({ id: newUser.id, role: newUser.role })

    // Save refresh_token in DB
    await this.usersService.updateUser({ id: newUser.id, refresh_token })
  }

  async googleLogin(user: LoginUserDto) {
    if (!user) {
      throw new NotFoundException('No user from google')
    }

    const userExist = await this.usersService.findUserByEmail(user.email)

    if (!userExist) {
      await this.register(user)
    }

    return {
      message: 'User information from google',
      user: user
    }
  }

  async signAccessToken(payload: { id: string; role: Role }) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_ACCESS_TOKEN'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN_ACCESS_TOKEN')
    })
  }

  async signRefreshToken(payload: { id: string; role: Role }) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN_REFRESH_TOKEN')
    })
  }

  async signAccessAndRefreshToken(payload: { id: string; role: Role }) {
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
