import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from './room.entity'

@Entity()
export class RoomState {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    default: true
  })
  public: boolean

  @Column({
    default: true
  })
  chat_active: boolean

  @OneToOne(() => Room)
  @JoinColumn()
  room: Room
}
