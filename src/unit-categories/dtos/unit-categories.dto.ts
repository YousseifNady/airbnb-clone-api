import { Expose, Transform } from 'class-transformer';

export class UnitCategoryDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  icon!: string;
}
