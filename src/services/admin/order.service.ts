import { prisma } from 'config/client';
import { TOTAL_ITEMS_PER_PAGE } from 'config/constant';

const getOrderAdmin = async (page: number) => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const skip = (page - 1) * pageSize;

    const orders = await prisma.order.findMany({
        skip: skip,
        take: pageSize,
        include: {
            user: true
        }
    })
    return orders;
}

const countTotalOrderPage = async () => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const totalItems = await prisma.order.count();

    const totalPages = Math.ceil(totalItems / pageSize);
    return totalPages;
}

const getOrderDetails = async (id: number) => {

    return await prisma.orderDetail.findMany({
        where: {
            orderId: id
        },
        include: {
            product: true
        }
    })

}

export { getOrderAdmin, getOrderDetails, countTotalOrderPage };
