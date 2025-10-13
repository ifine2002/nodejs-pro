import { Request, Response } from 'express';
import { countTotalProductClientPage, getAllProduct } from 'services/client/item.service';
import { getProductWithFilter } from 'services/client/product.filter';
import { getAllRoles, getUserById, handleCreateUser, handleDeleteUser, updateUserById } from 'services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    const { page } = req.query;
    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;

    const products = await getAllProduct(currentPage, 8);
    const totalPages = await countTotalProductClientPage(8);
    return res.render('client/home/show', {
        products,
        totalPages: +totalPages,
        page: +currentPage
    });
}

const getProductFilterPage = async (req: Request, res: Response) => {

    const { page, factory = '', target = '', price = '', sort = '' } = req.query as {
        page?: string;
        factory: string,
        target: string,
        price: string,
        sort: string
    }

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;

    // const products = await getAllProduct(currentPage, 6);
    // const totalPages = await countTotalProductClientPage(6);

    const data = await getProductWithFilter(currentPage, 6, factory, target, price, sort);
    return res.render('client/home/filter', {
        products: data.products,
        totalPages: +data.totalPages,
        page: +currentPage
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

export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser, getProductFilterPage };