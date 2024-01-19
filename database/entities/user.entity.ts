import { Role } from 'common/enums/users.enum'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Room } from './room.entity'

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

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  role: Role

  @Column({ nullable: true })
  refresh_token: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => User, (user) => user.room)
  room: Room
}
