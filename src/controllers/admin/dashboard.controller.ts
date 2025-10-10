import { prisma } from 'config/client';
import { Request, Response } from 'express';
import { getInfoDashboard } from 'services/admin/dashboard.service';
import { countTotalOrderPage, getOrderAdmin, getOrderDetails } from 'services/admin/order.service';
import { countTotalProductPage, getAllProduct } from 'services/admin/product.service';
import { countTotalUserPage, getAllUsers } from 'services/user.service';

const getDashboardPage = async (req: Request, res: Response) => {
    const info = await getInfoDashboard();
    return res.render('admin/dashboard/show', { info });
}

const getAdminUserPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;

    const users = await getAllUsers(currentPage);
    const totalPages = await countTotalUserPage();
    return res.render('admin/user/show', {
        users: users,
        totalPages: +totalPages,
        page: +currentPage
    });
}

const getAdminProductPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;

    const products = await getAllProduct(currentPage);
    const totalPages = await countTotalProductPage();
    return res.render('admin/product/show', {
        products,
        totalPages: +totalPages,
        page: +currentPage
    });
}

const getAdminOrderPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;

    const orders = await getOrderAdmin(currentPage) ?? [];
    const totalPages = await countTotalOrderPage();
    return res.render('admin/order/show', {
        orders,
        totalPages: +totalPages,
        page: +currentPage
    });
}

const getOrderDetailPage = async (req: Request, res: Response) => {

    const { id } = req.params;

    const orderDetails = await getOrderDetails(+id);

    console.log(orderDetails);

    return res.render('admin/order/detail', { orderDetails, id });
}


export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage, getOrderDetailPage };