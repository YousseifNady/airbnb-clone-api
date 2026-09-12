import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
    collection: 'countries',
})
export class Country {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, unique: true })
    country_code!: string;

    @Prop({ default: false })
    is_deleted!: string;

    @Prop({ default: null })
    deleted_at!: Date | null;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
