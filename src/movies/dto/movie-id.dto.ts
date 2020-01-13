import { IsUUID } from 'class-validator';

export class MovieIdDto {
  @IsUUID()
  movieId: string;
}
