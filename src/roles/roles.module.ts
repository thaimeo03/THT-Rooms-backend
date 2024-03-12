import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from 'database/entities/role.entity'
import { RolesController } from './roles.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
