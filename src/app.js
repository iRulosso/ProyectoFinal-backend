import express from 'express'
import routerProduct from './Routes/products.router.js';
import routerCart from './Routes/carts.router.js';
import handlebars from 'express-handlebars';
import routerViews from './Routes/views.router.js';
import { Server } from 'socket.io';
import ProductManager from './Manager/ProductManager.js';

import {dirname} from 'path'
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const productManager = new ProductManager("./products.json");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/api/products', routerProduct);
app.use('/api/carts', routerCart);
app.use('/', routerViews);

app.get('/realTimeProducts', (req, res)=>{
    res.render('realTimeProducts');
});

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

const httpServer = app.listen(8080, () => {
    console.log("Server OK on port 8080.");
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket)=>{

    const products = await productManager.GetProducts();
    socketServer.emit('getProducts', products);
    console.log(`New user connected: ID ${socket.id}`);

    socket.on('disconnect', ()=>{
        console.log("User disconnected");
    });

    socket.on('addProduct', async (p)=>{
        await productManager.AddProduct(p);
        const products = await productManager.GetProducts();
        socketServer.emit('getProducts', products);
    });
});