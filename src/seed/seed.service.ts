import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from 'src/users/repositories/user.repository';
import { RoleRepository } from 'src/roles/repositories/roles.repository';
import { Roles } from './constants/roles.constant';
import { seedUsers } from './constants/seed-users.constant';
import { HashHelper } from 'src/users/services/hash.helper';
import { In } from 'typeorm';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly hashHelper: HashHelper,
  ) {}

  async onModuleInit(): Promise<void> {
    const users = await this.userRepository.find({
      where: { email: In(seedUsers.map(u => u.email)) },
    });

    if (!(users.length === 2)) {
      const roles = await this.roleRepository.seedRoles(Roles);

      this.userRepository.save(
        seedUsers.map(user => ({
          ...user,
          password: this.hashHelper.hash(user.password),
          role: roles.filter(role => role.name === user.role)[0],
        })),
      );
    }
  }
}
