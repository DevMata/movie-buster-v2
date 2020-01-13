import { IsUUID, IsOptional, ValidateNested } from 'class-validator';
import { SubOrderInfo } from 'src/order-details/dto/order-info.dto';

export class OrderDto {
  @IsUUID()
  movieId: string;

  @IsOptional()
  @ValidateNested()
  order!: SubOrderInfo[];
}
