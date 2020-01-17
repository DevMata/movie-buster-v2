import { LocalStrategy } from './local.strategy';
import { AuthenticationService } from '../services/authentication.service';
import { Test } from '@nestjs/testing';

/*eslint-disable*/

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authenticationService: AuthenticationService;

  const mockAuthenticationService = () => ({});

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthenticationService,
          useFactory: mockAuthenticationService,
        },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
    authenticationService = module.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });
});
