import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { Roles } from 'common/decorators/roles.decorator'
import { ROLE } from 'common/enums/users.enum'
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
  async createRoom(@Req() req: Request, @Body() createRoomDto: CreateRoomDto) {
    const user = req.user as IJwtPayload

    const room = await this.roomsService.createRoom({
      userId: user.id,
      createRoomDto
    })

    return new ResponseData({ message: 'Create room success', data: room })
  }

  @Post('join')
  @UseGuards(JwtAuthGuard)
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

  @Delete(':room_id')
  @UseGuards(JwtAuthGuard)
  async deleteRoom(@Param('room_id') roomId: string) {
    await this.roomsService.deleteRoomById(roomId)

    return new ResponseData({ message: 'Delete room success' })
  }
}
