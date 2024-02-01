import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from 'database/data-source'
import { AuthModule } from './auth/auth.module'
import { RoomsModule } from './rooms/rooms.module';
import { VideoGroupGateway } from './video-group/video-group.gateway';

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
  providers: [VideoGroupGateway]
})
export class AppModule {}
