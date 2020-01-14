import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setApiKey, send } from '@sendgrid/mail';
import { User } from '../users/entities/user.entity';
import { Rent } from '../rents/entities/rent.entity';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {
    setApiKey(this.configService.get('SENDGRID_API_KEY'));
  }

  send(user: User, order: Order | Rent): void {
    try {
      const msg = {
        to: user.email,
        from: 'test@example.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: JSON.stringify(order),
      };
      send(msg);
    } catch (e) {
      console.error(e);
    }
  }
}
