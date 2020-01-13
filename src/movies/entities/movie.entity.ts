import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import { Rent } from 'src/rents/entities/rent.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  movieId: string;

  @Column({ length: 50, unique: true })
  title: string;

  @Column({ length: 500 })
  description: string;

  @Column()
  poster: string;

  @Column()
  trailer: string;

  @Column({ type: 'integer' })
  rentPrice: number;

  @Column({ type: 'integer' })
  salePrice: number;

  @Column({ type: 'integer' })
  stock: number;

  @Column({ type: 'integer', default: 0 })
  likes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable({ name: 'movie_tag' })
  tags: Tag[];

  @ManyToMany(
    () => User,
    user => user.movies,
  )
  users: User[];

  @OneToMany(
    () => Rent,
    rent => rent.movie,
  )
  rents!: Rent[];
}
