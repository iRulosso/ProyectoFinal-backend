import fs from 'fs'
import { ProductModel } from '../models/product.model.js';

export default class ProductManager {
    /*constructor(model) {
        this.model = model;
    }*/

    async GetProducts() {
        try {
            /*
            if (fs.existsSync(this.path)) {
                const productsFile = await fs.promises.readFile(this.path, 'utf-8');
                const productsJS = JSON.parse(productsFile);
                return productsJS
            } else {
                return []
            }*/

            const response = await ProductModel.find();
            return response;
        } catch (error) {
            console.log(error);
        }

    }

    async AddProduct(prod) {
        try {
            /*
            const pro = { ...prod }
            pro.id = await this.obtenerUltimoId() + 1;
            const products = await this.GetProducts();
            products.push(pro);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            */

            const response = await ProductModel.create(prod);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async GetProductById(id) {
        try {
            /*
            const products = await this.GetProducts();
            const prod = products.find((p) => p.id === id);
            if (!prod) {
                console.log("Producto no encontrado.");
                return
            } else {
                return prod;
            }*/

            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async DeleteProduct(id) {
        try {
            /*
            let products = await this.GetProducts();
            products = products.filter(prod => prod.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            */
            const response = await ProductModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async UpdateProduct(product, id) {
        try {
            /*
            await this.DeleteProduct(id);
            const updatedProduct = {id: id, ...product}
            const products = await this.GetProducts();
            products.push(updatedProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            */
            await ProductModel.updateOne({_id: id}, product);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async ObtenerLimiteProductos(limit){
        try {
            const prod = await this.GetProducts();
            let productosLimit = [];
            for(let i = 1; i<= limit; i++)
            {
                productosLimit.push(prod[i-1])
                if(i == limit)
                {
                    return productosLimit;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async obtenerUltimoId() {
        try {
            const prod = await this.GetProducts();
            let ultimaID = 0;
            prod.map((p) => {
                if (p.id > ultimaID) {
                    ultimaID = p.id;
                }
            })
            return ultimaID;
        } catch (error) {
            console.log(error);
        }

    }
}