import { IsIn, IsNotEmpty } from 'class-validator'
import { ROLE } from 'common/enums/users.enum'

export class UpdateROLEDto {
  @IsNotEmpty()
  @IsIn([ROLE.HOST, ROLE.USER, ROLE.BANNED])
  ROLE: ROLE
}
