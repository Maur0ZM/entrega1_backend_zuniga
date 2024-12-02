import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
});

ProductSchema.plugin(mongoosePaginate);

export const productModel = model('products', ProductSchema);
