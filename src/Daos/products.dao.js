import { ProductModel } from "./models/product.model";

export default class ProductManager {

    async GetProducts() {
        try {
            const response = await ProductModel.find();
            return response;
        } catch (error) {
            console.log(error);
        }

    }

    async AddProduct(prod) {
        try {
            const response = await ProductModel.create(prod);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async GetProductById(id) {
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async DeleteProduct(id) {
        try {
            const response = await ProductModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async UpdateProduct(product, id) {
        try {
            await ProductModel.updateOne({_id: id}, product);
            return product;
        } catch (error) {
            console.log(error);
        }
    }
}