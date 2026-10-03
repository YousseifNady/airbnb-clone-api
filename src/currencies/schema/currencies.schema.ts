import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from '../../common/mongoose/plugins/soft-delete.plugin';

@Schema({
  timestamps: true,
  collection: 'currencies',
})
export class Currency {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  currency_code!: string;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);

CurrencySchema.plugin(softDeletePlugin);
