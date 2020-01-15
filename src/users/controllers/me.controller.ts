import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from '../decorators/user.decorator';
import { UserPayload } from 'src/authentication/dto/user-payload.dto';

@Controller('users/me')
export class MeController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProfile(@LoggedUser() user: UserPayload): void {
    console.log(user);
  }
}
