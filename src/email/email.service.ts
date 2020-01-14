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

  send(user: User, order: Order | Rent, type: string): void {
    try {
      const msg = {
        to: user.email,
        from: 'test@example.com',
        subject: `Your ${type} bill`,
        templateId: this.configService.get<string>('TEMPLATE_ID'),
        dynamicTemplateDate: order,
      };
      send(msg);
    } catch (e) {
      console.error(e);
    }
  }
}
