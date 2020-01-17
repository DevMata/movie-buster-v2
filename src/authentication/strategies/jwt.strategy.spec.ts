/*eslint-disable*/

import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../users/repositories/user.repository';
import { Test } from '@nestjs/testing';
import { TokenPayload } from '../dto/token-payload.dto';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let configService: ConfigService;
  let userRepo: UserRepository;

  const mockConfigService = () => ({
    get: jest.fn().mockReturnValue('secret'),
  });

  const mockUserRepo = () => ({
    findOne: jest.fn(),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useFactory: mockConfigService,
        },
        {
          provide: UserRepository,
          useFactory: mockUserRepo,
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    configService = module.get<ConfigService>(ConfigService);
    userRepo = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return a user payload with user id, email and role', async () => {
      const mockUser = { role: { name: 'role' } };
      const mockPayload = { username: 'email', sub: 'userId' } as TokenPayload;
      const mockUserPayload = {
        userId: 'userId',
        email: 'email',
        role: 'role',
      };

      (userRepo.findOne as jest.Mock).mockResolvedValue(mockUser);

      const user = await strategy.validate(mockPayload);

      expect(user).toStrictEqual(mockUserPayload);
      expect(userRepo.findOne).toHaveBeenCalledWith('userId', {
        relations: ['role'],
      });
    });
  });
});
