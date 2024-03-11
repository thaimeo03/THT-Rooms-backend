import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { RolesService } from './roles.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Request } from 'express'
import { IJwtPayload } from 'common/strategies/jwt.strategy'
import { ResponseData } from 'common/customs/response-data'

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(':room_id')
  @UseGuards(JwtAuthGuard)
  async getRole(@Param('room_id') room_id: string, @Req() req: Request) {
    const user = req.user as IJwtPayload

    const role = await this.rolesService.findRoleByRoomIdAndUserId({ roomId: room_id, userId: user.id })
    return new ResponseData({
      message: 'Get role success',
      data: role
    })
  }
}
