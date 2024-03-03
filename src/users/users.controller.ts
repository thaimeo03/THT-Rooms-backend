import { Body, Controller, Delete, Get, Patch, Req, Res, UseGuards } from '@nestjs/common'
import { Roles } from 'common/decorators/roles.decorator'
import { ROLE } from 'common/enums/users.enum'
import { IJwtPayload } from 'common/strategies/jwt.strategy'
import { Request, Response } from 'express'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UsersService } from './users.service'
import { ResponseData } from 'common/customs/response-data'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.HOST, ROLE.USER)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as IJwtPayload

    await this.usersService.updateUserById({ id: user.id, payload: { refresh_token: null } })

    res.cookie('access_token', '', {
      maxAge: 0
    })

    res.cookie('refresh_token', '', {
      maxAge: 0
    })

    return new ResponseData({ message: 'Logout success' })
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    const user = req.user as IJwtPayload

    const res = await this.usersService.getProfile(user.id)

    return new ResponseData({ message: 'Get profile success', data: res })
  }

  // Handle later
  @Delete('leave-host')
  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.HOST)
  async leaveHost(@Req() req: Request) {
    const user = req.user as IJwtPayload
    await this.usersService.leaveHost(user.id)
    return new ResponseData({ message: 'Leave host success' })
  }
}
