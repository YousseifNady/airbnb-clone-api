import { Expose, Transform } from 'class-transformer';

export class CurrenciesDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  currency_code!: string;
}
