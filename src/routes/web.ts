import express, { Express } from 'express';
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser } from 'controllers/user.controller';

const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);
    router.get('/create-user', getCreateUserPage)
    router.post('/create-user', postCreateUser)
    router.post('/delete-user/:id', postDeleteUser)
    router.get('/view-user/:id', getViewUser)
    router.post('/update-user/:id', postUpdateUser)

    app.use('/', router);
}

export default webRoutes;