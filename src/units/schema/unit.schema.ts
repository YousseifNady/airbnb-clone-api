import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from '../../common/mongoose/plugins/soft-delete.plugin';
import { Min } from 'class-validator';
import { Country } from '../../countries/schema/countries.schema';
import { City } from '../../cities/schema/cities.schema';
import { User } from '../../users/schemas/user.schema';
import { UnitCategory } from '../../unit-categories/schema/unit-categories.schema';

@Schema({
  timestamps: true,
  collection: 'units',
})
export class Unit {
  @Prop({ required: true, unique: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  address!: string;

  @Prop({ required: true })
  photos!: string[];

  @Prop({ required: true })
  @Min(1)
  cost_per_day!: number;

  @Prop({ required: true, ref: Country.name })
  country_id!: string;

  @Prop({ required: true, ref: City.name })
  city_id!: string;

  @Prop({ required: true, ref: UnitCategory.name })
  unit_category_id!: string;

  @Prop({ required: true, ref: User.name })
  user_id!: string;

  @Prop({ required: true })
  rooms_count!: number;

  @Prop({ required: true })
  adults_count!: number;

  @Prop({ required: true })
  kidsCount!: number;

  @Prop({ required: true, default: false })
  has_internet_service!: boolean;

  @Prop({ required: true, default: false })
  has_kitchen!: boolean;

  @Prop({ required: true, default: false })
  has_private_garage!: boolean;

  @Prop({ required: true, default: true })
  availability!: boolean;

  @Prop({ required: true, default: true })
  is_active!: boolean;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);

UnitSchema.plugin(softDeletePlugin);
