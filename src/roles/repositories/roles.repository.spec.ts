import { RoleRepository } from './roles.repository';
import { Test } from '@nestjs/testing';

/*eslint-disable*/

describe('RoleRepository', () => {
  let repo: RoleRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RoleRepository],
    }).compile();

    repo = module.get<RoleRepository>(RoleRepository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('seedRoles', () => {
    it('should return new roles where roles does not exist', async () => {
      const roleNames = ['client', 'admin'];

      repo.find = jest.fn().mockResolvedValue([]);
      repo.save = jest
        .fn()
        .mockResolvedValue(roleNames.map(name => ({ name })));

      const roles = await repo.seedRoles(roleNames);

      expect(repo.save).toHaveBeenCalledWith(roleNames.map(name => ({ name })));
      expect(roles).toStrictEqual(roleNames.map(name => ({ name })));
    });

    it('should not return nothing when roles already exist', async () => {
      const roleNames = ['client', 'admin'];

      repo.find = jest
        .fn()
        .mockResolvedValue(roleNames.map(name => ({ name })));

      repo.save = jest.fn();

      await repo.seedRoles(roleNames);

      expect(repo.save).not.toHaveBeenCalled();
    });
  });
});
