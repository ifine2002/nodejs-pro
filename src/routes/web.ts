import express, { Express } from 'express';
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from 'controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller';
import fileUploadMiddleware from 'src/middleware/multer';

const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);

    router.post('/delete-user/:id', postDeleteUser)
    router.get('/view-user/:id', getViewUser)
    router.post('/update-user/:id', postUpdateUser)

    //admin routes
    router.get('/admin', getDashboardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/order', getAdminOrderPage);
    router.get('/admin/create-user', getCreateUserPage)
    router.post('/admin/create-user', fileUploadMiddleware("avatar"), postCreateUser)

    app.use('/', router);
}

export default webRoutes;