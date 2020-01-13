import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/repositories/user.repository';
import { MovieRepository } from 'src/movies/repositories/movie.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userRepository: UserRepository,
    private readonly movieRepository: MovieRepository,
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
}
