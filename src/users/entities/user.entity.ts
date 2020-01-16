import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Movie } from '../../movies/entities/movie.entity';
import { Rent } from '../../rents/entities/rent.entity';
import { Order } from '../../orders/entities/order.entity';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Role)
  role: Role;

  @ApiHideProperty()
  @ManyToMany(
    () => Movie,
    movie => movie.users,
  )
  @JoinTable({ name: 'like' })
  movies: Movie[];

  @ApiHideProperty()
  @OneToMany(
    () => Rent,
    rent => rent.user,
  )
  rents!: Rent[];

  @ApiHideProperty()
  @OneToMany(
    () => Order,
    order => order.user,
  )
  orders!: Order[];
}
