import { Module, HttpModule, forwardRef } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtConfigService } from './services/jwt-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from './entities/token.entity';
import { ResetPasswordService } from './services/reset-password.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    TypeOrmModule.forFeature([AccessToken]),
    EmailModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtStrategy,
    LocalStrategy,
    ResetPasswordService,
  ],
  exports: [AuthenticationService, TypeOrmModule, JwtModule],
})
export class AuthenticationModule {}
