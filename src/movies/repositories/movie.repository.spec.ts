/*eslint-disable*/

import { MovieRepository } from './movie.repository';
import { Test } from '@nestjs/testing';

describe('MovieRepository', () => {
  let movieRepo: MovieRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MovieRepository],
    }).compile();

    movieRepo = module.get<MovieRepository>(MovieRepository);
  });

  it('should be defined', () => {
    expect(movieRepo).toBeDefined();
  });
});
