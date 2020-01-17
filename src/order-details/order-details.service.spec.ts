/*eslint-disable*/

import { OrderDetailsService } from './order-details.service';
import { Repository } from 'typeorm';
import { MovieRepository } from '../movies/repositories/movie.repository';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderDetails } from './entities/order-detail.entity';

describe('OrderDetailsService', () => {
  let service: OrderDetailsService;
  let orderDetailsRepo: Repository<any>;
  let movieRepo: MovieRepository;

  const mockOrderDetailsRepo = () => ({});
  const mockMovieRepo = () => ({});

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OrderDetailsService,
        {
          provide: getRepositoryToken(OrderDetails),
          useFactory: mockOrderDetailsRepo,
        },
        { provide: MovieRepository, useFactory: mockMovieRepo },
      ],
    }).compile();

    service = module.get<OrderDetailsService>(OrderDetailsService);
    orderDetailsRepo = module.get<Repository<any>>(
      getRepositoryToken(OrderDetails),
    );
    movieRepo = module.get<MovieRepository>(MovieRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
