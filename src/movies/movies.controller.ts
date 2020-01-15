import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { MovieIdDto } from './dto/movie-id.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { LoggedUser } from 'src/users/decorators/user.decorator';
import { UserPayload } from 'src/authentication/dto/user-payload.dto';
import { AuthGuard } from '@nestjs/passport';
import { TokenGuard } from 'src/authentication/guards/token.guard';
import { Roles } from 'src/authentication/decorators/role.decorator';
import { RoleGuard } from 'src/authentication/guards/role.guard';
import { SerializedUser } from 'src/users/dto/user.serialize';
import { ApiTags } from '@nestjs/swagger';
import { MovieFiltersDto } from './dto/movie-filters.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(@Query() filters: MovieFiltersDto): Promise<Array<Movie>> {
    return this.moviesService.getMovies(filters);
  }

  @Get(':movieId')
  getMovie(@Param() movieIdDto: MovieIdDto): Promise<Movie> {
    return this.moviesService.getMovie(movieIdDto.movieId);
  }

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Put(':movieId')
  updateMovie(
    @Param() movieIdDto: MovieIdDto,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.updateMovie(movieIdDto.movieId, updateMovieDto);
  }

  @Put(':movieId/like')
  @UseGuards(AuthGuard('jwt'), TokenGuard)
  likeMovie(
    @Param() movieIdDto: MovieIdDto,
    @LoggedUser() user: UserPayload,
  ): void {
    this.moviesService.likeMovie(user, movieIdDto.movieId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':movieId/fans')
  getFanUsers(@Param() movieIdDto: MovieIdDto): Promise<Array<SerializedUser>> {
    return this.moviesService.getFanUsers(movieIdDto.movieId);
  }
}
