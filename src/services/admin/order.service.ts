import { prisma } from 'config/client';

const getOrderAdmin = async () => {

    return await prisma.order.findMany({
        include: {
            user: true
        }
    })

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

export { getOrderAdmin, getOrderDetails };
