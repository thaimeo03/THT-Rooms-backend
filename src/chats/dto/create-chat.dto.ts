import { IsNotEmpty } from 'class-validator'

export class CreateChatDto {
  @IsNotEmpty()
  message: string
}
