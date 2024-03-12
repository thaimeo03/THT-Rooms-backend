import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common'
import { RolesService } from './roles.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Request, Response } from 'express'
import { IJwtPayload } from 'common/strategies/jwt.strategy'
import { ResponseData } from 'common/customs/response-data'

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
}
