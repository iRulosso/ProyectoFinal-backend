import ProductManager from "../Daos/products.dao.js";

const productManager = new ProductManager();

export const GetProducts = async (req, res, next) => {
    try {
        const response = await productManager.GetProducts();
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export const GetProductById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const response = await productManager.GetProductById(id);
        if(!response) throw new Error('Product not found');
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export const DeleteProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        const response = await productManager.DeleteProduct(id);
        if(!response) throw new Error('Product not found');
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export const AddProduct = async (req, res, next) => {
    try {
        const newProduct = await productManager.AddProduct(req.body);
        res.json(newProduct);
    } catch (error) {
        next(error);
    }
}