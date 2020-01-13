import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { Rent } from '../../rents/entities/rent.entity';

@Entity()
export class RentDetails {
  @PrimaryGeneratedColumn('uuid')
  rentDetailId: string;

  @Column({ type: 'integer' })
  quantity: number;

  @Column()
  rentPrice: number;

  @Column()
  subTotal: number;

  @OneToOne(() => Movie)
  @JoinColumn()
  movie!: Movie;

  @ManyToOne(
    () => Rent,
    rent => rent.details,
  )
  rent!: Rent;
}
