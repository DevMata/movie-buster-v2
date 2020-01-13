import { IsUUID } from 'class-validator';

export class OrderDto {
  @IsUUID()
  movieId: string;
}
