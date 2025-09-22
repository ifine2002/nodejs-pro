import { Request, Response } from 'express';
import { getAllRoles, getAllUsers, getUserById, handleCreateUser, handleDeleteUser, updateUserById } from 'services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    //get users from db
    const users = await getAllUsers();
    return res.render('home', {
        users: users
    });
}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render('admin/user/create', {
        roles
    });
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, username, address, phone, role } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? null;
    //handle create user
    await handleCreateUser(fullName, username, address, phone, avatar);
    return res.redirect('/admin/user');
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