import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity'
import { Chat } from './chat.entity'
import { RoomState } from './room-state.entity'

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  color: string

  @Column()
  host_user_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => User, (user) => user.room)
  users: User[]

  @OneToMany(() => Chat, (chat) => chat.room)
  chats: Chat[]

  @OneToOne(() => RoomState, (roomState) => roomState.room)
  state: RoomState
}
