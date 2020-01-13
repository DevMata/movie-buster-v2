import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './repositories/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  exports: [TypeOrmModule],
})
export class RolesModule {}
