import { CartModel } from "./models/carts.model.js";

export default class CartManager {

    async GetCarts() {
        try {
            const response = await CartModel.find();
            return response;
        } catch (error) {
            console.log(error);
        }

    }

    async AddCart(cart) {
        try {
            const response = await CartModel.create(cart);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async GetCartById(id) {
        try {
            const response = await CartModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async AddProductToCart(cid, pid)
    {
        try {
            const carts = await CartModel.create(cart);
            const car = {
                id: pid,
                quantity: 1
            }
            carts.map((c)=>{
                if(c.id === cid)
                {
                    let carts_ = c.carts_;
                    const busqueda = carts_.find((p) => p.id === pid);

                    if(busqueda)
                    {
                        let cantidad = busqueda.quantity + 1;
                        const filterCart = carts_.filter(car => car.id !== cid);
                        const newCart = {id: cid, quantity: cantidad}
                        filterProduct.push(newCart)
                        c.carts_ = filterCart;
                    }else{
                        c.carts_.push(car);
                    }   
                }
            })
            await CartModel.updateOne({_id: id}, carts);
        } catch (error) {
            console.log(error);
        }
    }
}