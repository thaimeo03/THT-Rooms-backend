import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleGuard } from './google.guard'
import { Request } from 'express'
import { LoginUserDto } from 'src/users/dto/login-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  googleAuthRedirect(@Req() req: Request) {
    const user = req.user as LoginUserDto

    return this.authService.googleLogin(user)
  }
}
