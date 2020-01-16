import { IsJWT } from 'class-validator';

export class ResetTokenDto {
  @IsJWT()
  token: string;
}
