import { Role } from 'common/enums/users.enum'
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  @Index({ unique: true })
  email: string

  @Column()
  avatar: string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  role: Role

  @Column({ unique: true })
  refresh_token: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
