import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserRepository } from '../users/repositories/user.repository';
import { MovieRepository } from '../movies/repositories/movie.repository';
import { SubOrderInfo } from '../order-details/dto/order-info.dto';
import { RentDetailsService } from '../rent-details/rent-details.service';
import { Movie } from '../movies/entities/movie.entity';
import { RentDetails } from '../rent-details/entities/rent-detail.entity';

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(Rent) private readonly rentRepository: Repository<Rent>,
    private readonly userRepository: UserRepository,
    private readonly movieRepository: MovieRepository,
    private readonly rentDetailsService: RentDetailsService,
  ) {}

  async makeRent(userId: string, rent: Array<SubOrderInfo>): Promise<Rent> {
    const res = rent
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

    for (const subrent of rent) {
      const res = await this.rentDetailsService.validateSubRent(subrent);
      movies.push(res);
    }

    const subrentsInfo = movies.map((movie, i) => ({
      movie,
      quantity: rent[i].quantity,
    }));

    const subrents = new Array<RentDetails>();

    for (const subrent of subrentsInfo) {
      const res = await this.rentDetailsService.makeSubRent(
        subrent.movie,
        subrent.quantity,
      );
      subrents.push(res);
    }

    const total = subrents
      .map(suborder => suborder.subTotal)
      .reduce((a, b) => a + b);

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 3);

    return this.rentRepository.save({
      user,
      details: subrents,
      total,
      returnDate,
    });
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

    // const stock = (await this.movieRepository.findOne(rent.movie.movieId))
    //   .stock;

    // this.movieRepository.update(rent.movie.movieId, { stock: stock + 1 });
    return this.rentRepository.update(rent.rentId, { status: 'returned' });
  }
}
