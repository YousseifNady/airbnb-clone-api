import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from '../../common/mongoose/plugins/soft-delete.plugin';

@Schema({
    timestamps: true,
    collection: 'cities',
})
export class City {
    @Prop({ required: true })
    name!: string;
}

export const CitySchema = SchemaFactory.createForClass(City);

CitySchema.plugin(softDeletePlugin);
