import { Module } from '@nestjs/common';
import { RentDetailsService } from './rent-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentDetails } from './entities/rent-detail.entity';
import { MovieRepository } from '../movies/repositories/movie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RentDetails, MovieRepository])],
  providers: [RentDetailsService],
  exports: [TypeOrmModule, RentDetailsService],
})
export class RentDetailsModule {}
