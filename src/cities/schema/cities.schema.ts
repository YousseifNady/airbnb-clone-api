import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from '../../common/mongoose/plugins/soft-delete.plugin';
import { Types } from 'mongoose';
import { Country } from '../../countries/schema/countries.schema';

@Schema({
  timestamps: true,
  collection: 'cities',
})
export class City {
  @Prop({ required: true })
  name!: string;

  @Prop({
    type: Types.ObjectId,
    ref: Country.name,
    required: true,
  })
  country_id!: Types.ObjectId;
}

export const CitySchema = SchemaFactory.createForClass(City);

CitySchema.plugin(softDeletePlugin);
