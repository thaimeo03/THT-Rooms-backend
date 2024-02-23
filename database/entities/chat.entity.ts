import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'
import { Room } from './room.entity'

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'text'
  })
  message: string

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => User, (user) => user.chats)
  user: User

  @ManyToOne(() => Room, (room) => room.chats)
  room: Room
}
