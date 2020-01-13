import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  orderDetailId: string;

  @Column({ type: 'integer' })
  quantity: number;

  @Column()
  salePrice: number;

  @Column()
  subTotal: number;

  @OneToOne(() => Movie)
  @JoinTable()
  movie!: Movie;

  @ManyToOne(
    () => Order,
    order => order.details,
  )
  order!: Order;
}
