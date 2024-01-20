import { IsIn, IsNotEmpty } from 'class-validator'
import { Role } from 'common/enums/users.enum'

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsIn([Role.HOST, Role.USER, Role.BANNED])
  role: Role
}
