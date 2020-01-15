import { Controller, Post, UseGuards, Body, Param } from '@nestjs/common';
import { RentsService } from './rents.service';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/users/decorators/user.decorator';
import { UserPayload } from 'src/authentication/dto/user-payload.dto';
import { RentDto } from './dto/rent.dto';
import { ReturnDto } from './dto/return.dto';
import { UpdateResult } from 'typeorm';
import { Rent } from './entities/rent.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rents')
@Controller('rents')
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':rentId/return')
  returnMovie(@Param() returnDto: ReturnDto): Promise<UpdateResult> {
    return this.rentsService.returnMovie(returnDto.rentId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  rentMovies(
    @LoggedUser() user: UserPayload,
    @Body() rentDto: RentDto,
  ): Promise<Rent> {
    return this.rentsService.makeRent(user.userId, rentDto.rent);
  }
}
