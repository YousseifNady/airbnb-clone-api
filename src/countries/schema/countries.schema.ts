import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from '../../common/mongoose/plugins/soft-delete.plugin';

@Schema({
    timestamps: true,
    collection: 'countries',
})
export class Country {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, unique: true })
    country_code!: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

CountrySchema.plugin(softDeletePlugin);
