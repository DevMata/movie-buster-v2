/*eslint-disable*/

import { AuthenticationService } from './authentication.service';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccessToken } from '../entities/token.entity';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let userService: UsersService;
  let jwtService: JwtService;
  let accessTokenRepo: Repository<any>;

  const mockUserService = () => ({});

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
});
