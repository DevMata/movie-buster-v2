import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './entities/order-detail.entity';
import { MovieRepository } from 'src/movies/repositories/movie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails, MovieRepository])],
  providers: [OrderDetailsService],
  exports: [TypeOrmModule, OrderDetailsService],
})
export class OrderDetailsModule {}
