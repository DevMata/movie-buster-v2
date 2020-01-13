import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class BoughtMoviesService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userRepository: UserRepository,
  ) {}

  async getBoughtMovies(userId: string): Promise<Order[]> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.orderRepository.find({
      where: { user: user },
      relations: ['movie'],
    });
  }
}
