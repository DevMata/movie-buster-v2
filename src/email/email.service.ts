import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setApiKey, send } from '@sendgrid/mail';
import { Rent } from '../rents/entities/rent.entity';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {
    setApiKey(this.configService.get('SENDGRID_API_KEY'));
  }

  send(email: string, transaction: Order | Rent, type: 'order' | 'rent'): void {
    let templateId: string;
    let returnDate: string;

    if (type === 'order') {
      templateId = this.configService.get<string>('ORDER_TEMPLATE_ID');
    } else if (type === 'rent') {
      templateId = this.configService.get<string>('RENT_TEMPLATE_ID');
      returnDate = (transaction as Rent).returnDate.toDateString();
    }

    try {
      const msg = {
        to: email,
        from: 'moviebuster@mb.com',
        templateId: templateId,
        dynamicTemplateData: { ...transaction, returnDate },
      };

      send(msg);
    } catch (e) {
      console.error(e);
    }
  }

  sendResetPasswordEmail(email: string, token: string): void {
    const msg = {
      to: email,
      from: 'moviebuster@mb.com',
      subject: 'Password reset',
      html:
        `<strong>You required a password reset</strong>` +
        `</br></br>>` +
        `Here is your token: ${token}`,
    };

    send(msg);
  }
}
