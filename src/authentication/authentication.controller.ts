import { Controller, Post, UseGuards, Req, HttpCode } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req): Promise<{ accessToken: string }> {
    return this.authenticationService.login(req.user);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Req() req: Request): Promise<DeleteResult> {
    return this.authenticationService.logout(req);
  }
}
