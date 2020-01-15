import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { HashHelper } from './hash.helper';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RoleRepository } from 'src/roles/repositories/roles.repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly hashHelper: HashHelper,
  ) {}

  findAll(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUserByEmail(email);
  }

  findUserById(userId: string): Promise<User> {
    return this.userRepository.findUserById(userId);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    createUserDto.password = this.hashHelper.hash(password);

    const clientRole = await this.roleRepository.findRolebyName('client');

    return this.userRepository.createUser(createUserDto, clientRole);
  }

  updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(userId, updateUserDto);
  }

  async changePassword(
    userId: string,
    password: string,
  ): Promise<UpdateResult> {
    const newPassword = this.hashHelper.hash(password);

    return this.userRepository.changeUserPassword(userId, newPassword);
  }

  async changeRole(userId: string, roleName: string): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const role = await this.roleRepository.findOne({ name: roleName });
    if (!role) {
      throw new NotFoundException('role not found');
    }

    return this.userRepository.save({ ...user, role });
  }
}
