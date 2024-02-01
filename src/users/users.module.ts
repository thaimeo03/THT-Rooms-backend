import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'database/entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { RoomsModule } from 'src/rooms/rooms.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => RoomsModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
