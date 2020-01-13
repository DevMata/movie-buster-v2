import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rent } from 'src/rents/entities/rent.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class RentedMoviesService {
  constructor(
    @InjectRepository(Rent) private readonly rentRepository: Repository<Rent>,
    private readonly userRepository: UserRepository,
  ) {}

  async getRentedMovies(userId: string): Promise<Rent[]> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.rentRepository.find({
      where: { user: user },
      relations: ['movie'],
    });
  }
}
