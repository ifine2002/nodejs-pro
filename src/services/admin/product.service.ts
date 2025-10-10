import { prisma } from "config/client"
import { TOTAL_ITEMS_PER_PAGE } from "config/constant"

const createProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    factory: string,
    target: string,
    quantity: number,
    imageUpload: string) => {

    await prisma.product.create({
        data: {
            name,
            price,
            detailDesc,
            shortDesc,
            factory,
            target,
            quantity,
            ...(imageUpload && { image: imageUpload })
        }
    })
}

const updateProduct = async (
    id: number,
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    factory: string,
    target: string,
    quantity: number,
    imageUpload: string) => {

    await prisma.product.update({
        where: {
            id: +id
        },
        data: {
            name,
            price,
            detailDesc,
            shortDesc,
            factory,
            target,
            quantity,
            ...(imageUpload && { image: imageUpload })
        }
    })
}

const getAllProduct = async (page: number) => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const skip = (page - 1) * pageSize;
    const products = await prisma.product.findMany({
        skip: skip,
        take: pageSize
    });
    return products;
}

const countTotalProductPage = async () => {
    const pageSize = TOTAL_ITEMS_PER_PAGE;
    const totalItems = await prisma.product.count();

    const totalPages = Math.ceil(totalItems / pageSize);
    return totalPages;
}

const getProductById = async (id: string) => {
    return await prisma.product.findUnique({
        where: {
            id: +id
        }
    })
}

const handleDeleteProduct = async (id: string) => {
    //logic to delete user
    await prisma.product.delete({
        where: {
            id: +id
        }
    })
}

export { createProduct, getAllProduct, getProductById, updateProduct, handleDeleteProduct, countTotalProductPage }