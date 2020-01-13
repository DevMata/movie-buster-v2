import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/users/decorators/user.decorator';
import { UserPayload } from 'src/authentication/dto/user-payload.dto';
import { OrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  buyMovies(
    @LoggedUser() user: UserPayload,
    @Body() orderDto: OrderDto,
  ): Promise<Order> {
    return this.ordersService.makeOrder(user.userId, orderDto.order);
  }
}
