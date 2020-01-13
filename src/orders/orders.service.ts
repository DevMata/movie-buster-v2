import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/repositories/user.repository';
import { MovieRepository } from '../movies/repositories/movie.repository';
import { SubOrderInfo } from '../order-details/dto/order-info.dto';
import { OrderDetailsService } from 'src/order-details/order-details.service';
import { Movie } from '../movies/entities/movie.entity';
import { OrderDetails } from '../order-details/entities/order-detail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userRepository: UserRepository,
    private readonly movieRepository: MovieRepository,
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  async buyMovie(
    userId: string,
    movieId: string,
  ): Promise<{ orderId: string; boughtAt: Date }> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const movie = await this.movieRepository.findOne(movieId);
    if (!movie) {
      throw new NotFoundException('movie not found');
    }

    const stock = movie.stock;
    if (!stock) {
      throw new UnprocessableEntityException('sold out movie ');
    }

    const order = await this.orderRepository.save({ user, movie });
    this.movieRepository.save({ ...movie, stock: stock - 1 });

    return { orderId: order.orderId, boughtAt: order.boughtAt };
  }

  async makeOrder(userId: string, order: Array<SubOrderInfo>): Promise<Order> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const movies = new Array<Movie>();

    for (const suborder of order) {
      const res = await this.orderDetailsService.validateSubOrder(suborder);
      movies.push(res);
    }

    const subordersInfo = movies.map((movie, i) => ({
      movie,
      quantity: order[i].quantity,
    }));

    const suborders = new Array<OrderDetails>();

    for (const suborder of subordersInfo) {
      const res = await this.orderDetailsService.makeSubOrder(
        suborder.movie,
        suborder.quantity,
      );
      suborders.push(res);
    }

    const total = suborders
      .map(suborder => suborder.subTotal)
      .reduce((a, b) => a + b);

    return this.orderRepository.save({ user, details: suborders, total });
  }
}
