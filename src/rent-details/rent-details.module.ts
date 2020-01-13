import { Module } from '@nestjs/common';
import { RentDetailsService } from './rent-details.service';

@Module({
  providers: [RentDetailsService],
})
export class RentDetailsModule {}
