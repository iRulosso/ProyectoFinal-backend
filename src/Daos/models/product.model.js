import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
});

ProductSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model('products', ProductSchema);