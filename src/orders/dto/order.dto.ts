import {
  IsUUID,
  IsOptional,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { SubOrderInfo } from 'src/order-details/dto/order-info.dto';
import { Type } from 'class-transformer';

export class OrderDto {
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => SubOrderInfo)
  order: SubOrderInfo[];
}
