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
  name: string;

  @Column({ name: 'user_email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'user_password', nullable: false })
  password: string;

  @Column({ name: 'user_username', nullable: false, unique: true })
  username: string;

  @Column({ name: 'user_birthday' })
  birthday: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
