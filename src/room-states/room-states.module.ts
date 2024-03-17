import { Module } from '@nestjs/common'
import { RoomStatesService } from './room-states.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoomState } from 'database/entities/room-state.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RoomState])],
  providers: [RoomStatesService],
  exports: [RoomStatesService]
})
export class RoomStatesModule {}
