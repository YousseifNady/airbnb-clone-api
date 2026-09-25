import { Exclude, Expose } from 'class-transformer';
import { Roles } from '../../common/enums/role.enum';

export class SystemAdminDto {
  @Expose()
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  role: string = Roles.SYSTEM_ADMIN;

  @Exclude()
  password!: string;

  @Exclude()
  _v!: number;
}
