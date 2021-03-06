import { Matches, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class MovieFiltersDto {
  @IsOptional()
  @Matches(/(-)?(likes|title)/, {
    message:
      'valid options: likes,title and their descending variants -likes, -title',
  })
  sort?: string;

  @IsOptional()
  @IsString()
  tags?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;
}
