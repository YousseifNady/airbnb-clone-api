import { Expose, Transform } from 'class-transformer';
import { CountriesDto } from '../../countries/dtos/countries.dto';

export class AppSettingsDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  id!: string;

  @Expose()
  vat_rate!: number;

  @Expose()
  min_price!: number;
}
