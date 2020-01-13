import { IsUUID, IsInt, IsPositive } from 'class-validator';

export class SubOrderInfo {
  @IsUUID()
  movieId: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}
