import { Body, Controller, Get, Patch, Req, Res, UseGuards } from '@nestjs/common'
import { Roles } from 'common/decorators/roles.decorator'
import { Role } from 'common/enums/users.enum'
import { IJwtPayload } from 'common/strategies/jwt.strategy'
import { Request, Response } from 'express'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UsersService } from './users.service'
import { ResponseData } from 'common/customs/response-data'
import { UpdateRoleDto } from 'src/users/dto/update-role.dto'
import { pick } from 'lodash'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.HOST, Role.USER)
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

  // @Patch('role')
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.HOST, Role.USER)
  // async updateRole(@Req() req: Request, @Body() updateRoleDto: UpdateRoleDto) {
  //   const user = req.user as IJwtPayload
  //   await this.usersService.updateRole({ id: user.id, updateRoleDto: pick(updateRoleDto, ['role']) })

  //   return new ResponseData({ message: 'Update role success' })
  // }
}
