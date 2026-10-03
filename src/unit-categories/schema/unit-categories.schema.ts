import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from '../../common/mongoose/plugins/soft-delete.plugin';

@Schema({
  timestamps: true,
  collection: 'unit-categories',
})
export class UnitCategory {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  icon!: string;
}

export const UnitCategorySchema = SchemaFactory.createForClass(UnitCategory);

UnitCategorySchema.plugin(softDeletePlugin);
