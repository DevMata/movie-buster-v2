import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  rolId: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ApiHideProperty()
  @OneToMany(
    () => User,
    user => user.role,
  )
  users: User[];
}
