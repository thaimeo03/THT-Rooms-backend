import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { Roles } from 'common/decorators/roles.decorator'
import { Role } from 'common/enums/users.enum'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Request } from 'express'
import { IJwtPayload } from 'common/strategies/jwt.strategy'
import { CreateRoomDto } from './dto/create-room.dto'
import { RoomsService } from './rooms.service'
import { ResponseData } from 'common/customs/response-data'
import { JoinRoomDto } from './dto/join-room.dto'

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.HOST)
  async createRoom(@Req() req: Request, @Body() createRoomDto: CreateRoomDto) {
    const user = req.user as IJwtPayload

    const room = await this.roomsService.createRoom({
      userId: user.id,
      userRole: user.role,
      createRoomDto
    })

    return new ResponseData({ message: 'Create room success', data: room })
  }

  @Post('join')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.HOST, Role.USER)
  async joinRoom(@Req() req: Request, @Body() joinRoomDto: JoinRoomDto) {
    const user = req.user as IJwtPayload
    await this.roomsService.joinRoom({
      userId: user.id,
      joinRoomDto
    })

    return new ResponseData({ message: 'Join room success' })
  }

  @Get(':host_id')
  @UseGuards(JwtAuthGuard)
  async getRooms(@Param('host_id') hostId: string) {
    const rooms = await this.roomsService.findRoomsByHostId(hostId)

    return new ResponseData({ message: 'Get rooms success', data: rooms })
  }

  // @Post('leave')
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.HOST, Role.USER)
  // async leaveRoom(@Req() req: Request) {
  //   // Hard code
  //   await this.roomsService.leaveRoom()
  //   return new ResponseData({ message: 'Leave room success' })
  // }
}
