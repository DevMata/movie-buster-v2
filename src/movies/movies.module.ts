import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './repositories/movie.repository';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TagsModule } from 'src/tags/tags.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieRepository]),
    TagsModule,
    UsersModule,
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
  exports: [TypeOrmModule, UsersModule],
})
export class MoviesModule {}
