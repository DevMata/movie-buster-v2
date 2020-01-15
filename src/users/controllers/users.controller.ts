import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserIdDto } from '../dto/user-id.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ChangeRoleDto } from '../dto/change-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { TokenGuard } from 'src/authentication/guards/token.guard';
import { RoleGuard } from 'src/authentication/guards/role.guard';
import { Roles } from 'src/authentication/decorators/role.decorator';
import { RentedMoviesService } from '../services/rented-movies.service';
import { Rent } from 'src/rents/entities/rent.entity';
import { LikedMoviesService } from '../services/liked-movies.service';
import { Movie } from 'src/movies/entities/movie.entity';
import { BoughtMoviesService } from '../services/bought-movies.service';
import { Order } from 'src/orders/entities/order.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rentedMoviesService: RentedMoviesService,
    private readonly likedMoviesService: LikedMoviesService,
    private readonly boughtMoviesService: BoughtMoviesService,
  ) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  getUsers(): Promise<Array<User>> {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @Get(':userId')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  getUser(@Param() userIdDto: UserIdDto): Promise<User> {
    return this.usersService.findUserById(userIdDto.userId);
  }

  @ApiBearerAuth()
  @Put(':userId')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  updateUser(
    @Param() userIdDto: UserIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userIdDto.userId, updateUserDto);
  }

  @ApiBearerAuth()
  @Put(':userId/changeRole')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  changeRole(
    @Param() userIdDto: UserIdDto,
    @Body() changeRoleDto: ChangeRoleDto,
  ): Promise<User> {
    return this.usersService.changeRole(userIdDto.userId, changeRoleDto.role);
  }

  @ApiBearerAuth()
  @Get(':userId/rents')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  getRentedMovies(@Param() userIdDto: UserIdDto): Promise<Array<Rent>> {
    return this.rentedMoviesService.getRentedMovies(userIdDto.userId);
  }

  @ApiBearerAuth()
  @Get(':userId/likes')
  @UseGuards(AuthGuard('jwt'), TokenGuard)
  getLikedMovies(@Param() userIdDto: UserIdDto): Promise<Array<Movie>> {
    return this.likedMoviesService.getLikedMovies(userIdDto.userId);
  }

  @ApiBearerAuth()
  @Get(':userId/orders')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  getBoughtMovies(@Param() userIdDto: UserIdDto): Promise<Array<Order>> {
    return this.boughtMoviesService.getBoughtMovies(userIdDto.userId);
  }
}
