import { Router } from "express";
import ProductManager from "../Manager/ProductManager.js";

const productManager = new ProductManager("./products.json");
const routerViews = Router();

routerViews.get('/', async (req, res)=>{
    const prods = await productManager.GetProducts();

    res.render('home', {prod: prods});
});

export default routerViews;