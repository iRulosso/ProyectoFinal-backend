import { Router } from "express";
import * as controller from '../controllers/products.controllers.js';

const routerProduct = Router();



const router = Router();

router.get('/all', controller.getAllCtr);

router.get('/id/:id', controller.getByIdCtr);

router.post('/', controller.createCtr);

router.put('/:id', controller.updateCtr);

router.delete('/:id', controller.deleteCtr);

/*
routerProduct.get('/', async (req, res) => {
    try {
        const {limit} = req.query;
        if(limit > 0)
        {
            const products = await productManager.ObtenerLimiteProductos(limit);
            res.status(200).json(products);
        }else{
            const products = await productManager.GetProducts();
            res.status(200).json(products);
        }     
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

routerProduct.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.GetProductById(Number(pid));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product Not Found" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


routerProduct.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        const product = {
            title,
            description,
            code,
            price,
            status:true,
            stock,
            category,
            thumbnails
        }
        const newProduct = await productManager.AddProduct(product);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

routerProduct.put('/:pid', async (req, res) => {
    try {
        const product = req.body;
        const { pid } = req.params;
        const productExist = await productManager.GetProductById(parseInt(pid));
        if (productExist) {
            await productManager.UpdateProduct(product, parseInt(pid));
            res.json({ message: `Product id: ${parseInt(pid)} updated` });
        } else {
            res.status(400).json({ message: `Product id: ${parseInt(pid)} Not found` })
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

routerProduct.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.GetProductById(Number(pid));
        if (product) {
            await productManager.DeleteProduct(parseInt(pid));
            res.status(200).json({ message: "Product eliminated sucefully" });
        } else {
            res.status(404).json({ message: "Product Not Found" });
        }
    } catch (error) {

    }
});*/

export default routerProduct;