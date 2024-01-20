import { IsNotEmpty } from 'class-validator'

export class JoinRoomDto {
  @IsNotEmpty()
  room_id: string
}
