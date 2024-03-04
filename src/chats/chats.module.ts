import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Chat } from 'database/entities/chat.entity'
import { ChatsService } from './chats.service'
import { RoomsModule } from 'src/rooms/rooms.module'
import { UsersModule } from 'src/users/users.module'
import { ChatsController } from './chats.controller'
import { RolesModule } from 'src/roles/roles.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    forwardRef(() => RoomsModule),
    forwardRef(() => UsersModule),
    RolesModule
  ],
  providers: [ChatsService],
  exports: [ChatsService],
  controllers: [ChatsController]
})
export class ChatsModule {}
