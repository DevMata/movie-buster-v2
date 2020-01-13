import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/users/decorators/user.decorator';
import { UserPayload } from 'src/authentication/dto/user-payload.dto';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  buyMovie(
    @LoggedUser() user: UserPayload,
    @Body() orderDto: OrderDto,
  ): Promise<{ orderId: string; boughtAt: Date }> {
    return this.ordersService.buyMovie(user.userId, orderDto.movieId);
  }
}
