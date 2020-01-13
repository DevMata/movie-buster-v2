import {
  IsUUID,
  IsOptional,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { SubOrderInfo } from 'src/order-details/dto/order-info.dto';
import { Type } from 'class-transformer';

export class RentDto {
  @IsUUID()
  @IsOptional()
  movieId: string;

  @IsOptional()
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => SubOrderInfo)
  rent: SubOrderInfo[];
}
