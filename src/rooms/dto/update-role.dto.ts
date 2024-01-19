import { IsIn, IsNotEmpty, IsNotEmptyObject } from 'class-validator'
import { Role } from 'common/enums/users.enum'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsIn([Role.HOST, Role.USER, Role.BANNED])
  role: Role
}
