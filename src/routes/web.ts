import express, { Express } from 'express';
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from 'controllers/user.controller';
import { getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller';

const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);
    router.get('/create-user', getCreateUserPage)
    router.post('/create-user', postCreateUser)
    router.post('/delete-user/:id', postDeleteUser)
    router.get('/view-user/:id', getViewUser)
    router.post('/update-user/:id', postUpdateUser)

    //admin routes
    router.get('/admin', getDashboardPage);
    router.get('/admin/user', getAdminUserPage);

    app.use('/', router);
}

export default webRoutes;