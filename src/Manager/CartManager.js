import fs from 'fs'

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    async GetCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsFile = await fs.promises.readFile(this.path, 'utf-8');
                const cartsJS = JSON.parse(cartsFile);
                return cartsJS
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }

    }

    async AddCart(obj) {
        try {
            const cart = { id:0, ...obj }
            cart.id = await this.obtenerUltimoId() + 1;
            const carts = await this.GetCarts();
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
        } catch (error) {
            console.log(error);
        }
    }

    async GetCartById(id) {
        try {
            const carts = await this.GetCarts();
            const cart = carts.find((c) => c.id === id);
            if (!cart) {
                console.log("Cart not found.");
                return
            } else {
                return cart;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async AddProductToCart(cid, pid)
    {
        try {
            let carts = await this.GetCarts();
            const prod = {
                id: pid,
                quantity: 1
            }
            carts.map((c)=>{
                if(c.id === cid)
                {
                    let products = c.products;
                    const busqueda = products.find((p) => p.id === pid);

                    if(busqueda)
                    {
                        let cantidad = busqueda.quantity + 1;
                        const filterProduct = products.filter(prod => prod.id !== pid);
                        const newProduct = {id: pid, quantity: cantidad}
                        filterProduct.push(newProduct)
                        c.products = filterProduct;
                    }else{
                        c.products.push(prod);
                    }   
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
        } catch (error) {
            console.log(error);
        }
    }

    async obtenerUltimoId() {
        try {
            const cart = await this.GetCarts();
            let ultimaID = 0;
            cart.map((c) => {
                if (c.id > ultimaID) {
                    ultimaID = c.id;
                }
            })
            return ultimaID;
        } catch (error) {
            console.log(error);
        }

    }
}