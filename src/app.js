import express from 'express'
import routerProduct from './Routes/products.router.js';
import routerCart from './Routes/carts.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProduct);
app.use('/api/carts', routerCart);

app.listen(8080, () => {
    console.log("Server OK on port 8080.");
});