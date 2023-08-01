import CartManager from "../Daos/carts.dao.js";

const cartManager = new CartManager();

export const GetCarts = async (req, res, next) => {
    try {
        const response = await cartManager.GetCarts();
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export const GetCartById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const response = await cartManager.GetCartById(id);
        if(!response) throw new Error('Cart not found');
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export const AddCart = async (req, res, next) => {
    try {
        const newCart = await cartManager.AddCart(req.body);
        res.json(newCart);
    } catch (error) {
        next(error);
    }
}