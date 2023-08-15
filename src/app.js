import express from 'express'
import routerProduct from './Routes/products.router.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import userRouter from './routes/user.router.js';
import MongoStore from 'connect-mongo';
import routerCart from './Routes/carts.router.js';
import handlebars from 'express-handlebars';
import routerViews from './Routes/views.router.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import ProductManager from './Daos/products.dao.js';
import { connectionString } from './db/connection.js';
import './db/connection.js'

import {dirname} from 'path'
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
};

const productManager = new ProductManager();
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

app.use(cookieParser());
app.use(session(mongoStoreOptions));

app.use('/users', userRouter);
app.use('/', viewsRouter);

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