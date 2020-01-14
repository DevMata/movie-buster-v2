import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setApiKey, send } from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  setApiKey(): void {
    setApiKey(this.configService.get('SENDGRID_API_KEY'));
  }

  send(): void {
    const msg = {
      to: 'test@example.com',
      from: 'test@example.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    send(msg);
  }
}
