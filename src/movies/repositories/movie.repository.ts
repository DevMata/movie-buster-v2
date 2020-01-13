import { EntityRepository, Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  getMovies(): Promise<Array<Movie>> {
    return this.find({
      select: ['movieId', 'title', 'description', 'stock', 'likes'],
    });
  }

  findMovieById(movieId: string): Promise<Movie> {
    return this.findOne(movieId);
  }

  findMovieByTitle(title: string): Promise<Movie> {
    return this.findOne({ title: title });
  }
}
