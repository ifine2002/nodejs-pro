import express, { Express } from 'express';
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from 'controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller';
import fileUploadMiddleware from 'src/middleware/multer';
import { getProductDetail } from 'controllers/client/product.controller';
import { getCreateProductPage, getViewProduct, postCreateProduct, postDeleteProduct, postUpdateProduct } from 'controllers/admin/product.controller';
import { getLoginPage, getRegisterPage, postRegister } from 'controllers/client/auth.controller';
import passport from 'passport';

const router = express.Router();

const webRoutes = (app: Express) => {
    //client routes
    router.get('/', getHomePage);
    router.get('/product/:id', getProductDetail);

    //auth routes
    router.get('/login', getLoginPage);
    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/',
        failureMessage: true
    }));
    router.get('/register', getRegisterPage);
    router.post('/register', postRegister);

    //admin routes
    router.get('/admin', getDashboardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user', getCreateUserPage)
    router.post('/admin/create-user', fileUploadMiddleware("avatar"), postCreateUser)
    router.post('/admin/delete-user/:id', postDeleteUser)
    router.get('/admin/view-user/:id', getViewUser)
    router.post('/admin/update-user/:id', fileUploadMiddleware("avatar"), postUpdateUser) //server is stupid, it cannot handle POST method with form-data -> reset server (restart pc)

    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/create-product', getCreateProductPage);
    router.post('/admin/create-product', fileUploadMiddleware("image", "images/product"), postCreateProduct);
    router.get('/admin/view-product/:id', getViewProduct);
    router.post('/admin/update-product/:id', fileUploadMiddleware("image", "images/product"), postUpdateProduct);
    router.post('/admin/delete-product/:id', postDeleteProduct)

    router.get('/admin/order', getAdminOrderPage);

    app.use('/', router);
}

export default webRoutes;