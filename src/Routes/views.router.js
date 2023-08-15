import { Router } from "express";
import ProductManager from "../Manager/ProductManager.js";
const router = Router();
import { login, register, errorLogin, errorRegister, profile } from "../controllers/views.controllers.js";

const productManager = new ProductManager("./products.json");
const routerViews = Router();

router.get('/login', login);
router.get('/register', register);
router.get('/error-login', errorLogin);
router.get('/error-register', errorRegister);
router.get('/profile', profile);

routerViews.get('/', async (req, res)=>{
    const prods = await productManager.GetProducts();

    res.render('home', {prod: prods});
});

export default routerViews;