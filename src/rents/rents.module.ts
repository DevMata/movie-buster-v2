import { Module } from '@nestjs/common';
import { RentsService } from './rents.service';
import { RentsController } from './rents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';
import { MoviesModule } from '../movies/movies.module';
import { RentDetailsModule } from '../rent-details/rent-details.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rent]), MoviesModule, RentDetailsModule],
  providers: [RentsService],
  controllers: [RentsController],
})
export class RentsModule {}
