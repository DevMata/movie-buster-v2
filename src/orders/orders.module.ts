import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { OrderDetailsModule } from 'src/order-details/order-details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    MoviesModule,
    OrderDetailsModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
