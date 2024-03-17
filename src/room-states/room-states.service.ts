import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomState } from 'database/entities/room-state.entity'
import { Repository } from 'typeorm'
import { CreateRoomStateDto } from './dto/create-room-state.dto'

@Injectable()
export class RoomStatesService {
  constructor(@InjectRepository(RoomState) private readonly roomStatesService: Repository<RoomState>) {}

  async createRoomState(createRoomStateDto: CreateRoomStateDto) {
    return this.roomStatesService.save(createRoomStateDto)
  }

  async findRoomStateByRoomId(roomId: string) {
    return this.roomStatesService.findOne({ where: { room: { id: roomId } } })
  }

  async deleteRoomStateByRoomId(roomId: string) {
    return this.roomStatesService.delete({ room: { id: roomId } })
  }
}
