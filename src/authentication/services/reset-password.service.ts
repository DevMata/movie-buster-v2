import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../users/repositories/user.repository';
import { EmailService } from '../../email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from '../entities/token.entity';
import { Repository } from 'typeorm';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { sign } from 'jsonwebtoken';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    @InjectRepository(AccessToken)
    private readonly accessTokenRepository: Repository<AccessToken>,
  ) {}

  async sendResetEmail(email: string): Promise<void> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const secret = this.configService.get('JWT_SECRET_RESET_PASSWORD');
    const jti = randomStringGenerator();
    const payload = { sub: user.userId, email: user.email };

    await this.accessTokenRepository.save({ userId: user.userId, jti });

    const token = sign(payload, secret, { jwtid: jti, expiresIn: '6h' });

    await this.emailService.sendResetPasswordEmail(user.email, token);
  }
}
