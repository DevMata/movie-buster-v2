import { EntityRepository, Repository, In } from 'typeorm';
import { Role } from '../entities/role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  async seedRoles(roles: string[]): Promise<Role[]> {
    const savedRoles = (await this.find({ name: In(roles) })).map(
      role => role.name,
    );

    if (!roles.every(role => savedRoles.includes(role))) {
      return this.save(roles.map(role => ({ name: role })));
    }
  }

  findRolebyName(roleName: string): Promise<Role> {
    return this.findOne({ name: roleName });
  }
}
