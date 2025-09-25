import express, { Express } from 'express';
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from 'controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller';
import fileUploadMiddleware from 'src/middleware/multer';

const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);

    //admin routes
    router.get('/admin', getDashboardPage);
    router.get('/admin/user', getAdminUserPage);
    router.get('/admin/create-user', getCreateUserPage)
    router.post('/admin/create-user', fileUploadMiddleware("avatar"), postCreateUser)
    router.post('/admin/delete-user/:id', postDeleteUser)
    router.get('/admin/view-user/:id', getViewUser)
    router.post('/admin/update-user/:id', fileUploadMiddleware("avatar"), postUpdateUser) //server is stupid, it cannot handle POST method with form-data -> reset server (restart pc)

    router.get('/admin/product', getAdminProductPage);
    router.get('/admin/order', getAdminOrderPage);

    app.use('/', router);
}

export default webRoutes;