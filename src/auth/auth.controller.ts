import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleGuard } from './google.guard'
import { Request, Response } from 'express'
import { LoginUserDto } from 'src/users/dto/login-user.dto'
import { ConfigService } from '@nestjs/config'
import { FacebookGuard } from './facebook.guard'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as LoginUserDto
    const { access_token, refresh_token } = await this.authService.oauthLogin(user) // Change to redirect to local

    res.cookie('access_token', access_token, {
      httpOnly: true
    })
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true
    })
  }

  @Get('facebook')
  @UseGuards(FacebookGuard)
  facebookAuth() {}

  @Get('facebook/redirect')
  @UseGuards(FacebookGuard)
  facebookAuthRedirect(@Req() req: Request) {
    const user = req.user as LoginUserDto
    return this.authService.oauthLogin(user) // Change to redirect to local
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: Request) {
    return req.user
  }
}
