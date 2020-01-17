/*eslint-disable*/

import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Repository, getRepository, getTreeRepository } from 'typeorm';
import { UserRepository } from '../users/repositories/user.repository';
import { EmailService } from '../email/email.service';
import { OrderDetailsService } from '../order-details/order-details.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepo: Repository<any>;
  let userRepo: UserRepository;
  let orderDetailService: OrderDetailsService;
  let emailService: EmailService;

  const mockOrderRepo = () => ({});
  const mockUserRepo = () => ({
    findOne: jest.fn(),
  });
  const mockOrderDetailService = () => ({});
  const mockEmailService = () => ({});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useFactory: mockOrderRepo,
        },
        {
          provide: UserRepository,
          useFactory: mockUserRepo,
        },
        {
          provide: OrderDetailsService,
          useFactory: mockOrderDetailService,
        },
        {
          provide: EmailService,
          useFactory: mockEmailService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderRepo = module.get<Repository<any>>(getRepositoryToken(Order));
    userRepo = module.get<UserRepository>(UserRepository);
    orderDetailService = module.get<OrderDetailsService>(OrderDetailsService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
