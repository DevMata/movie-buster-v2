import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeRoleDto {
  @IsString()
  @IsNotEmpty()
  role: string;
}
