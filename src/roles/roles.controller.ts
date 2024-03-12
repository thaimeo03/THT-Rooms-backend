import { Controller, Get, Param, Put, Req, UseGuards, Res } from '@nestjs/common'
import { RolesService } from './roles.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Request, Response } from 'express'
import { IJwtPayload } from 'common/strategies/jwt.strategy'
import { ResponseData } from 'common/customs/response-data'
import { RolesGuard } from 'src/auth/role.guard'
import { Roles } from 'common/decorators/roles.decorator'
import { ROLE } from 'common/enums/users.enum'

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(':room_id')
  @UseGuards(JwtAuthGuard)
  async getRole(@Param('room_id') room_id: string, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as IJwtPayload

    const role = await this.rolesService.findRoleByRoomIdAndUserId({ roomId: room_id, userId: user.id })

    const key = JSON.stringify({ roomId: room_id, userId: user.id })
    if (!req.cookies[key]) {
      res.cookie(key, role)
    }

    return new ResponseData({
      message: 'Get role success',
      data: role
    })
  }

  @Put(':room_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.HOST)
  async changeUserRole(@Req() req: Request) {
    return 'Oke'
  }
}
