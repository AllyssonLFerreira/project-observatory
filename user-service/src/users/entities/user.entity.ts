import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  user_id: number;

  @Column({ name: 'user_name', nullable: false })
  user_name: string;

  @Column({ name: 'user_email', nullable: false, unique: true })
  user_email: string;

  @Column({ name: 'user_password', nullable: false })
  user_password: string;

  @Column({ name: 'user_username', nullable: false, unique: true })
  user_username: string;

  @Column({ name: 'user_birthday' })
  user_birthday: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
