/*eslint-disable*/

import { AuthenticationService } from './authentication.service';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccessToken } from '../entities/token.entity';
import { compareSync } from 'bcryptjs';
import { async } from 'rxjs/internal/scheduler/async';

jest.mock('bcryptjs');

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let userService: UsersService;
  let jwtService: JwtService;
  let accessTokenRepo: Repository<any>;

  const mockUserService = () => ({
    findUserByEmail: jest.fn(),
  });

  const mockJwtService = () => ({});

  const mockAccessTokenRepo = () => ({});

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: UsersService, useFactory: mockUserService },
        { provide: JwtService, useFactory: mockJwtService },
        {
          provide: getRepositoryToken(AccessToken),
          useFactory: mockAccessTokenRepo,
        },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    accessTokenRepo = module.get<Repository<any>>(
      getRepositoryToken(AccessToken),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return null if the user is not found', async () => {
      (userService.findUserByEmail as jest.Mock).mockResolvedValue(null);
      (compareSync as jest.Mock).mockReturnValue(true);

      expect(await service.validateUser('email', 'pass')).toBe(null);
    });

    it('should return null if the provided password is not correct', async () => {
      (userService.findUserByEmail as jest.Mock).mockResolvedValue('user');
      (compareSync as jest.Mock).mockReturnValue(false);

      expect(await service.validateUser('email', 'pass')).toBe(null);
    });

    it('should return user if authentication is correct', async () => {
      const mockUser = { userId: 'userId', email: 'email' };

      (userService.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (compareSync as jest.Mock).mockReturnValue(true);

      expect(await service.validateUser('email', 'pass')).toStrictEqual(
        mockUser,
      );
    });
  });
});
