import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role } from '../../roles/entities/role.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserById(userId: string): Promise<User> {
    const user = await this.findOne(userId, {
      select: ['name', 'lastname', 'email', 'createdAt', 'updatedAt'],
    });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  findUserByEmail(email: string): Promise<User> {
    return this.findOne({ email: email });
  }

  getUsers(): Promise<Array<User>> {
    return this.find({
      select: ['name', 'lastname', 'email', 'createdAt', 'updatedAt'],
    });
  }

  async createUser(createUserDto: CreateUserDto, role: Role): Promise<User> {
    const user = await this.findUserByEmail(createUserDto.email);
    if (user)
      throw new ConflictException('provided email is already registered');

    return this.save({ ...createUserDto, role });
  }

  async changeUserPassword(
    userId: string,
    newPassword: string,
  ): Promise<UpdateResult> {
    await this.findUserById(userId);

    return this.update(userId, { password: newPassword });
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException('user not found');

    if (updateUserDto.email) {
      const res = await this.findOne({ email: updateUserDto.email });
      if (res) {
        throw new ConflictException('email is already used by other user');
      }
    }

    return this.save({ ...user, ...updateUserDto });
  }
}
