/* eslint-disable */

import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UserRepository', () => {
  let userRepo: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepo = module.get<UserRepository>(UserRepository);
  });

  describe('findUserById', () => {
    it('should return a user found based on id', async () => {
      const mockUser = { name: 'name', lastname: 'lastname' };
      userRepo.findOne = jest.fn().mockResolvedValue(mockUser);

      const user = await userRepo.findUserById('userId');

      expect(userRepo.findOne).toHaveBeenCalledWith('userId', {
        select: ['name', 'lastname', 'email', 'createdAt', 'updatedAt'],
      });
      expect(user).toBe(mockUser);
    });

    it('should throw a not found exception when the user is not found', () => {
      userRepo.findOne = jest.fn().mockResolvedValue(null);

      expect(userRepo.findUserById('userId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createUser', () => {
    const mockCreateUserDto: CreateUserDto = {
      name: 'name',
      lastname: 'lastname',
      email: 'email',
      password: 'pass',
    };
    const mockRole: Role = {
      name: 'client',
      roleId: 'roleId',
      createdAt: new Date(),
      modifiedAt: new Date(),
    };

    it('should return the created user', async () => {
      userRepo.findUserByEmail = jest.fn().mockResolvedValue(null);
      userRepo.save = jest.fn().mockResolvedValue('user');

      const user = await userRepo.createUser(mockCreateUserDto, mockRole);
      expect(user).toBe('user');
      expect(userRepo.save).toHaveBeenCalledWith({
        ...mockCreateUserDto,
        role: mockRole,
      });
    });

    it('should throw a conflict exception', () => {
      userRepo.findUserByEmail = jest.fn().mockResolvedValue('user');

      expect(userRepo.createUser(mockCreateUserDto, mockRole)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('updateUser', () => {
    const mockUpdateUserDto = {
      name: 'name',
      lastname: 'lastname',
      email: 'email',
    };

    it('should return updated user', async () => {
      const mockUser = { name: 'name', lastname: 'lastname' };

      userRepo.findOne = jest
        .fn()
        .mockResolvedValueOnce(mockUser)
        .mockResolvedValueOnce(null);
      userRepo.save = jest.fn().mockResolvedValue('updated user');

      const user = await userRepo.updateUser('userId', mockUpdateUserDto);

      expect(user).toBe('updated user');
      expect(userRepo.save).toHaveBeenCalledWith({
        ...mockUser,
        ...mockUpdateUserDto,
      });
      expect(userRepo.findOne).toHaveBeenCalledTimes(2);
    });

    it('should throw a not found exception when the user is not found', () => {
      userRepo.findOne = jest.fn().mockResolvedValue(null);

      expect(userRepo.updateUser('userId', mockUpdateUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('shoud throw a conflict exception if the new email is already in use', () => {
      userRepo.find = jest
        .fn()
        .mockResolvedValueOnce('user')
        .mockResolvedValueOnce('user');

      expect(userRepo.updateUser('userId', mockUpdateUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
