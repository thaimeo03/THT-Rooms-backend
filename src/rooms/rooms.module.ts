import { Module, forwardRef } from '@nestjs/common'
import { RoomsController } from './rooms.controller'
import { RoomsService } from './rooms.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from 'database/entities/room.entity'
import { UsersModule } from 'src/users/users.module'
import { ChatsModule } from 'src/chats/chats.module'
import { RolesModule } from 'src/roles/roles.module'
import { RoomStatesModule } from 'src/room-states/room-states.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    forwardRef(() => UsersModule),
    forwardRef(() => ChatsModule),
    RolesModule,
    RoomStatesModule
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule {}
