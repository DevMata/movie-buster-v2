import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';
import { HashHelper } from './services/hash.helper';
import { UsersController } from './controllers/users.controller';
import { RolesModule } from 'src/roles/roles.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { RentedMoviesService } from './services/rented-movies.service';
import { Rent } from 'src/rents/entities/rent.entity';
import { LikedMoviesService } from './services/liked-movies.service';
import { Order } from 'src/orders/entities/order.entity';
import { BoughtMoviesService } from './services/bought-movies.service';
import { MeController } from './controllers/me.controller';
import { MeService } from './services/me.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, Rent, Order]),
    RolesModule,
    forwardRef(() => AuthenticationModule),
  ],
  providers: [
    UsersService,
    HashHelper,
    RentedMoviesService,
    LikedMoviesService,
    BoughtMoviesService,
    MeService,
  ],
  exports: [UsersService, TypeOrmModule, HashHelper, AuthenticationModule],
  controllers: [MeController, UsersController],
})
export class UsersModule {}
