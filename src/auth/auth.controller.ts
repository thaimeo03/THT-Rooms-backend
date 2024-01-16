import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleGuard } from './google.guard'
import { Request, Response } from 'express'
import { LoginUserDto } from 'src/users/dto/login-user.dto'
import { FacebookGuard } from './facebook.guard'
import { RefreshTokenAuthGuard } from './refresh-token.guard'
import { ResponseData } from 'common/customs/response-data'
import { IRefreshTokenPayload } from 'common/strategies/refresh-token.strategy'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as LoginUserDto
    const { access_token, refresh_token } = await this.authService.oauthLogin(user)

    res.cookie('access_token', access_token, {
      httpOnly: true
    })
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true
    })

    return new ResponseData({ message: 'Login success' }) // Change to redirect to local
  }

  @Get('facebook')
  @UseGuards(FacebookGuard)
  facebookAuth() {}

  @Get('facebook/redirect')
  @UseGuards(FacebookGuard)
  async facebookAuthRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as LoginUserDto
    const { access_token, refresh_token } = await this.authService.oauthLogin(user) // Change to redirect to local

    res.cookie('access_token', access_token, {
      httpOnly: true
    })
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true
    })

    return new ResponseData({ message: 'Login success' }) // Change to redirect to local
  }

  @Get('refresh-token')
  @UseGuards(RefreshTokenAuthGuard)
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as IRefreshTokenPayload

    const access_token = await this.authService.refreshToken({
      id: user.payload.id,
      refresh_token: user.refreshToken
    })

    res.cookie('access_token', access_token, {
      httpOnly: true
    })

    return new ResponseData({ message: 'Refresh token success' })
  }
}
