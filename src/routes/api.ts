
import { postAddProductToCartApi } from "controllers/client/api.controller";
import express, { Express } from "express";

const router = express.Router();

const apiRoutes = (app: Express) => {

    router.post('/add-product-to-cart', postAddProductToCartApi)

    app.use('/api', router);
}

export default apiRoutes;