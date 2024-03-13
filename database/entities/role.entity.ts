import { ROLE } from 'common/enums/users.enum'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.USER
  })
  name: string

  @Column()
  room_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => User, (user) => user.roles)
  user: User
}
