import { Request, Response } from 'express';
import { getAllProduct } from 'services/client/item.service';
import { getAllRoles, getAllUsers, getUserById, handleCreateUser, handleDeleteUser, updateUserById } from 'services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    const products = await getAllProduct();
    const user = req.user;
    console.log(">>> check user:", user)
    return res.render('client/home/show', { products });
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
    await handleCreateUser(fullName, username, address, phone, avatar, role);
    return res.redirect('/admin/user');
}

const postDeleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    await handleDeleteUser(userId)
    return res.redirect('/admin/user');
}

const getViewUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await getUserById(userId);
    const roles = await getAllRoles();
    return res.render('admin/user/detail', {
        user: user,
        userId: userId,
        roles
    });
}

const postUpdateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { fullName, phone, address, role } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? undefined;
    await updateUserById(userId, fullName, phone, address, role, avatar);
    return res.redirect('/admin/user');
}

export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };