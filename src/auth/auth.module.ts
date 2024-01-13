import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { GoogleStrategy } from 'common/strategies/google.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [JwtModule.register({ global: true }), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy]
})
export class AuthModule {}
