import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderDetails } from '../../order-details/entities/order-detail.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @CreateDateColumn()
  boughtAt: Date;

  @ApiHideProperty()
  @ManyToOne(
    () => User,
    user => user.orders,
  )
  user!: User;

  @OneToMany(
    () => OrderDetails,
    orderDetail => orderDetail.order,
  )
  details: OrderDetails[];
}
