import { Exclude } from 'class-transformer';

export class UserSerialize {
  name: string;

  lastname: string;

  email: string;

  @Exclude()
  password: string;
}
