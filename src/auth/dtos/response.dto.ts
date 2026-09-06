import { Expose } from 'class-transformer';

export class ResponseDto {
  @Expose()
  access_token!: string;

  @Expose()
  refresh_token!: string;
}
