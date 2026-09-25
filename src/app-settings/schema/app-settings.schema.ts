import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
    timestamps: true,
    collection: 'app-settings',
})
export class AppSetting {
    @Prop({ required: true, min: 0, max: 25, default: 0 })
    vat_rate!: string;

    @Prop({ required: true, min: 0, default: 0 })
    min_price!: Types.ObjectId;
}

export const AppSettingSchema = SchemaFactory.createForClass(AppSetting);
