import { Query, Schema } from "mongoose";

export function softDeletePlugin(schema: Schema) {
    schema.add({
        deleted_at: {
            type: Date,
            default: null
        }
    });

    const excludedDlete = function (this: Query<any, any>) {
        this.where({ 'deleted_at': null });
    };

    schema.pre('find', excludedDlete);
    schema.pre('findOne', excludedDlete);
    schema.pre('findOneAndUpdate', excludedDlete);
    schema.pre('countDocuments', excludedDlete);
}