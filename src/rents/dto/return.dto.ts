import { IsUUID } from 'class-validator';

export class ReturnDto {
  @IsUUID()
  rentId: string;
}
