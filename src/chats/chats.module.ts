import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Chat } from 'database/entities/chat.entity'
import { ChatsService } from './chats.service'
import { RoomsModule } from 'src/rooms/rooms.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), RoomsModule, UsersModule],
  providers: [ChatsService],
  exports: [ChatsService]
})
export class ChatsModule {}
