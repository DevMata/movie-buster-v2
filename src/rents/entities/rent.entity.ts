import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn('uuid')
  rentId: string;

  @CreateDateColumn()
  rentedAt: Date;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(
    () => User,
    user => user.rents,
  )
  user!: User;

  @ManyToOne(
    () => Movie,
    movie => movie.rents,
  )
  movie!: Movie;
}
