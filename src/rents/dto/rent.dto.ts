import { ValidateNested, ArrayNotEmpty } from 'class-validator';
import { SubOrderInfo } from 'src/order-details/dto/order-info.dto';
import { Type } from 'class-transformer';

export class RentDto {
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => SubOrderInfo)
  rent: SubOrderInfo[];
}
