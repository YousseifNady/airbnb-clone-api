import { Expose } from 'class-transformer';

export class ResponseDto {
  @Expose()
  accessToken!: string;

  @Expose()
  refreshToken!: string;
}
