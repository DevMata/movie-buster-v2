import { IsUUID } from 'class-validator';

export class RentDto {
  @IsUUID()
  movieId: string;
}
