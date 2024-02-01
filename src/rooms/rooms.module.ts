import { Module, forwardRef } from '@nestjs/common'
import { RoomsController } from './rooms.controller'
import { RoomsService } from './rooms.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from 'database/entities/room.entity'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Room]), forwardRef(() => UsersModule)],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule {}
