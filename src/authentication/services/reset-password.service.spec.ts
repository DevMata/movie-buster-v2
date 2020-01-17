/*eslint-disable*/

import { ResetPasswordService } from './reset-password.service';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../users/repositories/user.repository';
import { EmailService } from '../../email/email.service';
import { Repository } from 'typeorm';
import { HashHelper } from '../../users/services/hash.helper';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccessToken } from '../entities/token.entity';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { sign, verify } from 'jsonwebtoken';
import { NotFoundException } from '@nestjs/common';

jest.mock('@nestjs/common/utils/random-string-generator.util');
jest.mock('jsonwebtoken');

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;
  let configService: ConfigService;
  let userRepo: UserRepository;
  let emailService: EmailService;
  let accessTokenRepo: Repository<any>;
  let hashHelper: HashHelper;

  const mockConfigService = () => ({
    get: jest.fn().mockReturnValue('secret'),
  });

  const mockUserRepo = () => ({
    findUserByEmail: jest.fn(),
  });

  const mockEmailService = () => ({
    sendResetPasswordEmail: jest.fn(),
  });

  const mockAccessTokenRepo = () => ({
    save: jest.fn(),
  });

  const mockHashHelper = () => ({});

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ResetPasswordService,
        {
          provide: ConfigService,
          useFactory: mockConfigService,
        },
        {
          provide: UserRepository,
          useFactory: mockUserRepo,
        },
        {
          provide: EmailService,
          useFactory: mockEmailService,
        },
        {
          provide: getRepositoryToken(AccessToken),
          useFactory: mockAccessTokenRepo,
        },
        {
          provide: HashHelper,
          useFactory: mockHashHelper,
        },
      ],
    }).compile();

    service = module.get<ResetPasswordService>(ResetPasswordService);
    configService = module.get<ConfigService>(ConfigService);
    userRepo = module.get<UserRepository>(UserRepository);
    emailService = module.get<EmailService>(EmailService);
    accessTokenRepo = module.get<Repository<any>>(
      getRepositoryToken(AccessToken),
    );
    hashHelper = module.get<HashHelper>(HashHelper);
  });

  it('should be defines', () => {
    expect(service).toBeDefined();
  });

  describe('sendResetEmail', () => {
    it('should throw a not found exception if the user is not found', () => {
      (userRepo.findUserByEmail as jest.Mock).mockResolvedValue(null);

      expect(service.sendResetEmail('email')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should send a reset password email', async () => {
      const mockUser = { userId: 'userId', email: 'email' };
      const payload = { sub: 'userId', email: 'email' };

      (userRepo.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (randomStringGenerator as jest.Mock).mockReturnValue('random uuid');
      (sign as jest.Mock).mockReturnValue('jwt token');

      await service.sendResetEmail('email');

      expect(accessTokenRepo.save).toHaveBeenCalledWith({
        userId: 'userId',
        jti: 'random uuid',
      });
      expect(sign).toHaveBeenCalledWith(payload, 'secret', {
        jwtid: 'random uuid',
        expiresIn: '6h',
      });
      expect(emailService.sendResetPasswordEmail).toHaveBeenCalledWith(
        'email',
        'jwt token',
      );
    });
  });
});
