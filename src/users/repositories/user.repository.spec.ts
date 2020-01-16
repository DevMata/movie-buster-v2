import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';

/* eslint-disable */

describe('UserRepository', () => {
  let userRepo;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepo = module.get<UserRepository>(UserRepository);
  });
});
