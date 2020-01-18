import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, print } from 'redis';

@Injectable()
export class RedisServiceService implements OnModuleInit {
  onModuleInit(): void {
    const client = createClient('redis://redis-server');

    client.on('connect', () => {
      console.log('redis connected');
    });

    client.on('error', err => {
      console.log(`Something went wrong ${err}`);
    });
  }
}
