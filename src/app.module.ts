import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from 'database/data-source'
import { AuthModule } from './auth/auth.module'
import { RoomsModule } from './rooms/rooms.module'
import { VideoGroupGateway } from './video-group/video-group.gateway'
import { ChatGroupGateway } from './chat-group/chat-group.gateway'
import { RoomGateway } from './room/room.gateway'

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UsersModule,
    RoomsModule
  ],
  controllers: [],
  providers: [VideoGroupGateway, ChatGroupGateway, RoomGateway]
})
export class AppModule {}
