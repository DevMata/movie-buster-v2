import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from 'src/users/repositories/user.repository';
import { RoleRepository } from 'src/roles/repositories/roles.repository';
import { Admin } from './constants/admin.constant';
import { Roles } from './constants/roles.contants';
import { HashHelper } from 'src/users/services/hash.helper';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly hashHelper: HashHelper,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.roleRepository.seedRoles(Roles);
    const admin = await this.userRepository.findOne({ email: Admin.email });

    if (!admin) {
      const role = await this.roleRepository.findOne({ name: 'admin' });
      const hashedPassword = this.hashHelper.hash(Admin.password);
      this.userRepository.save({
        ...Admin,
        password: hashedPassword,
        role: role,
      });
    }
  }
}
