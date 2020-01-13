import { Controller, Post, UseGuards, Body, Param } from '@nestjs/common';
import { RentsService } from './rents.service';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/users/decorators/user.decorator';
import { UserPayload } from 'src/authentication/dto/user-payload.dto';
import { RentDto } from './dto/rent.dto';
import { ReturnDto } from './dto/return.dto';
import { UpdateResult } from 'typeorm';

@Controller('rents')
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  rentMovie(
    @LoggedUser() user: UserPayload,
    @Body() rentDto: RentDto,
  ): Promise<{ rentId: string; rentedAt: Date }> {
    return this.rentsService.rentMovie(user.userId, rentDto.movieId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':rentId/return')
  returnMovie(@Param() returnDto: ReturnDto): Promise<UpdateResult> {
    return this.rentsService.returnMovie(returnDto.rentId);
  }
}
