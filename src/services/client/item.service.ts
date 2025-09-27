import { prisma } from "config/client"

const getAllProduct = async () => {
    return await prisma.product.findMany();
}

const getProductById = async (id: string) => {
    return await prisma.product.findUnique({
        where: {
            id: +id
        }
    })
}

export { getAllProduct, getProductById }