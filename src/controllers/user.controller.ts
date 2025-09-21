import { Request, Response } from 'express';
import { getAllUsers, getUserById, handleCreateUser, handleDeleteUser, updateUserById } from 'services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    //get users from db
    const users = await getAllUsers();
    return res.render('home', {
        users: users
    });
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render('create-user');
}

const postCreateUser = async (req: Request, res: Response) => {
    const { name, email, address } = req.body;

    //handle create user
    await handleCreateUser(name, email, address);
    return res.redirect('/');
}

const postDeleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    await handleDeleteUser(userId)
    return res.redirect('/');
}

const getViewUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await getUserById(userId);
    return res.render('view-user', {
        user: user,
        userId: userId
    });
}

const postUpdateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, email, address } = req.body;
    await updateUserById(userId, name, email, address);
    return res.redirect('/');
}

export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };