import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { Roles } from 'common/decorators/roles.decorator'
import { Role } from 'common/enums/users.enum'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Request } from 'express'
import { IJwtPayload } from 'common/strategies/jwt.strategy'
import { CreateRoomDto } from './dto/create-room.dto'
import { RoomsService } from './rooms.service'
import { ResponseData } from 'common/customs/response-data'

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.HOST, Role.USER)
  async createRoom(@Req() req: Request, @Body() createRoomDto: CreateRoomDto) {
    const user = req.user as IJwtPayload

    const room = await this.roomsService.createRoom({
      userId: user.id,
      userRole: user.role,
      createRoomDto
    })

    return new ResponseData({ message: 'Create room success', data: room })
  }
}
