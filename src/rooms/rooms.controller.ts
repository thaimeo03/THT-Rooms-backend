import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common'
import { Roles } from 'common/decorators/roles.decorator'
import { Role } from 'common/enums/users.enum'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Request } from 'express'
import { IJwtPayload } from 'common/strategies/jwt.strategy'

@Controller('rooms')
export class RoomsController {}
