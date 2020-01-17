/* istanbul ignore file */

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RentDetails } from '../../rent-details/entities/rent-detail.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn('uuid')
  rentId: string;

  @CreateDateColumn()
  rentedAt: Date;

  @Column()
  returnDate: Date;

  @Column({ default: 'pending' })
  status: string;

  @ApiHideProperty()
  @ManyToOne(
    () => User,
    user => user.rents,
  )
  user!: User;

  @OneToMany(
    () => RentDetails,
    rentDetails => rentDetails.rent,
  )
  details: RentDetails[];
}
