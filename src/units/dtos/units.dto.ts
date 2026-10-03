import { Expose, Type, Transform } from 'class-transformer';
import { FilesystemService } from '../../filesystem/filesystem.service';

export class UnitsDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  address!: string;

  @Expose()
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((p: string) => FilesystemService.getUrl(p))
      : [],
  )
  photos!: string[];

  @Expose()
  cost_per_day!: number;

  @Expose()
  country_id!: string;

  @Expose()
  city_id!: string;

  @Expose()
  unit_category_id!: string;

  @Expose()
  user_id!: string;

  @Expose()
  rooms_count!: number;

  @Expose()
  adults_count!: number;

  @Expose()
  kidsCount!: number;

  @Expose()
  has_internet_service!: boolean;

  @Expose()
  has_kitchen!: boolean;

  @Expose()
  has_private_garage!: boolean;

  @Expose()
  availability!: boolean;

  @Expose()
  is_active!: boolean;
}
