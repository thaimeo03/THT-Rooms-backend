import { ROLE } from 'common/enums/users.enum'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Room } from './room.entity'
import { Chat } from './chat.entity'
import { Role } from './role.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  @Index({ unique: true })
  oauth_id: string

  @Column({
    nullable: true
  })
  email: string

  @Column({
    type: 'longtext'
  })
  avatar: string

  @Column({ nullable: true })
  refresh_token: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => Room, (room) => room.users)
  room: Room

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat

  @OneToMany(() => Role, (role) => role.user)
  roles: Role[]
}
