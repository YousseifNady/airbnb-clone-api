import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  phone!: string;

  @Exclude()
  password!: string;

  @Exclude()
  _v!: number;
}
