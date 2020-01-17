import { EntityRepository, Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { MovieFiltersDto } from '../dto/movie-filters.dto';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async getMovies(filters: MovieFiltersDto): Promise<Array<Movie>> {
    const { tags, title, sort } = filters;

    let tagsArray = new Array<string>();
    const regex = /(?<dir>\-)?(?<prop>(likes|title))/;

    const queryBuilder = this.createQueryBuilder('movie').leftJoinAndSelect(
      'movie.tags',
      'tag',
    );

    if (tags) {
      tagsArray = tags.split(',').map(tag => tag.toLowerCase());
      queryBuilder.andWhere('tag.name IN (:...tags)', { tags: tagsArray });
    }

    if (title) {
      queryBuilder.andWhere('LOWER(movie.title) like :title', {
        title: `%${title.toLowerCase()}%`,
      });
    }

    if (sort) {
      const regexExec = regex.exec(sort);

      if (regexExec && regexExec.groups) {
        const sorting = regexExec.groups.dir ? 'DESC' : 'ASC';
        const property = regexExec.groups.prop;
        queryBuilder.orderBy(`movie.${property}`, sorting);
      }
    }

    const movies = await queryBuilder
      .select([
        'movie.movieId',
        'movie.title',
        'movie.description',
        'movie.likes',
        'movie.stock',
        'tag',
      ])
      .getMany();

    if (tags && tagsArray.length) {
      return movies.filter(movie => movie.tags.length === tagsArray.length);
    }

    return movies;
  }

  findMovieById(movieId: string): Promise<Movie> {
    return this.findOne(movieId);
  }

  findMovieByTitle(title: string): Promise<Movie> {
    return this.findOne({ title: title });
  }
}
