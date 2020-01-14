import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/repositories/user.repository';
import { SubOrderInfo } from '../order-details/dto/order-info.dto';
import { OrderDetailsService } from 'src/order-details/order-details.service';
import { Movie } from '../movies/entities/movie.entity';
import { OrderDetails } from '../order-details/entities/order-detail.entity';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userRepository: UserRepository,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly emailService: EmailService,
  ) {}

  async makeOrder(userId: string, order: Array<SubOrderInfo>): Promise<Order> {
    const res = order
      .map(suborder => suborder.movieId)
      .every((id, i, a) => a.indexOf(id) === a.lastIndexOf(id));

    if (!res) {
      throw new BadRequestException('every movie Id must be unique');
    }

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

    user.email = '***';

    const completed = await this.orderRepository.save({
      user,
      details: suborders,
      total,
    });

    this.emailService.send(user, completed);

    return completed;
  }
}
