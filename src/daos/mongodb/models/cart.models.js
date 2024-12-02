import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const CartSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products',
            default: []
        }
    ]
})

CartSchema.plugin(mongoosePaginate);
CartSchema.pre('find', function (){
    this.populate('products');
})

export const CartModel = model('cart', CartSchema);