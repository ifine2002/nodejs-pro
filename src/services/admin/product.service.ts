import { prisma } from "config/client"

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

export { createProduct, getAllProduct, getProductById, updateProduct }