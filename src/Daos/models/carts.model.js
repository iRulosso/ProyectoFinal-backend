import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: {type: Array, required: true}
});

export const CartModel = mongoose.model('carts', ProductSchema);