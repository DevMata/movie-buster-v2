import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserRepository } from 'src/users/repositories/user.repository';
import { MovieRepository } from 'src/movies/repositories/movie.repository';

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(Rent) private readonly rentRepository: Repository<Rent>,
    private readonly userRepository: UserRepository,
    private readonly movieRepository: MovieRepository,
  ) {}

  async rentMovie(
    userId: string,
    movieId: string,
  ): Promise<{ rentId: string; rentedAt: Date }> {
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

    const rent = await this.rentRepository.save({ user, movie });
    this.movieRepository.save({ ...movie, stock: stock - 1 });

    return { rentId: rent.rentId, rentedAt: rent.rentedAt };
  }

  async returnMovie(rentId: string): Promise<UpdateResult> {
    const rent = await this.rentRepository.findOne(rentId, {
      relations: ['movie'],
    });
    if (!rent) {
      throw new NotFoundException('rent not found');
    }

    if (rent.status === 'returned') {
      throw new MethodNotAllowedException(
        'the movie has already been returned',
      );
    }

    const stock = (await this.movieRepository.findOne(rent.movie.movieId))
      .stock;

    this.movieRepository.update(rent.movie.movieId, { stock: stock + 1 });
    return this.rentRepository.update(rent.rentId, { status: 'returned' });
  }
}
