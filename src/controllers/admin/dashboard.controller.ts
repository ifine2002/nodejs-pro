import { prisma } from 'config/client';
import { Request, Response } from 'express';
import { getOrderAdmin, getOrderDetails } from 'services/admin/order.service';
import { getAllProduct } from 'services/admin/product.service';
import { getAllUsers } from 'services/user.service';

const getDashboardPage = async (req: Request, res: Response) => {
    return res.render('admin/dashboard/show');
}

const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    return res.render('admin/user/show', {
        users: users
    });
}

const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getAllProduct();
    return res.render('admin/product/show', {
        products
    });
}

const getAdminOrderPage = async (req: Request, res: Response) => {

    const orders = await getOrderAdmin() ?? [];

    return res.render('admin/order/show', { orders });
}

const getOrderDetailPage = async (req: Request, res: Response) => {

    const { id } = req.params;

    const orderDetails = await getOrderDetails(+id);

    console.log(orderDetails);

    return res.render('admin/order/detail', { orderDetails, id });
}


export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage, getOrderDetailPage };