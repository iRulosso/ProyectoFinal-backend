import { Router } from "express";
import { AddCart, GetCartById, GetCarts } from "../Controllers/carts.controller.js";

const routerCart = Router();

routerProduct.get('/', GetCarts);
routerProduct.get('/:cid', GetCartById);
routerProduct.post('/', AddCart);

/*
routerCart.post('/', async (req, res) => {
    try {
        const { id, products } = req.body;
        const cart = {
            id,
            products
        }
        const newCart = await cartManager.AddCart(cart);
        res.status(200).json(newCart);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

routerCart.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const newCart = await cartManager.AddProductToCart(Number(cid), Number(pid));
        res.status(200).json(newCart);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

routerCart.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.GetCartById(Number(cid));
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: "Cart Not Found" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
*/

export default routerCart;