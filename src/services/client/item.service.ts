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

const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    })

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })

    if (cart) {
        //update
        //sum = tổng số loại hàng hóa trong giỏ (không phải tổng số lượng hàng hóa)
        //cập nhật cart-detail
        //nếu chưa có, tạo mới. có rồi, cập nhật quantity
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: productId,
                cartId: cart.id
            }
        })

        if (!currentCartDetail) {
            //cập nhật sum giỏ hàng
            await prisma.cart.update({
                where: {
                    id: cart.id
                },
                data: {
                    sum: {
                        increment: 1
                    }
                }
            })
        }

        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity,
                }
            },
            create: {
                price: product.price,
                quantity: quantity,
                productId: productId,
                cartId: cart.id
            }
        })

    } else {
        //create
        await prisma.cart.create({
            data: {
                sum: 1,
                userId: user.id,
                cartDetails: {
                    create: [
                        {
                            price: product.price,
                            quantity: quantity,
                            productId: productId
                        }
                    ]
                }
            }
        })
    }
}

const getProductInCart = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: userId
        }
    })
    if (cart) {
        const currentCartDetail = await prisma.cartDetail.findMany({
            where: {
                cartId: cart.id
            },
            include: { product: true }
        })
        return currentCartDetail;
    }
    return []
}

const deleteProductInCart = async (cartDetailId: number, userId: number, sumCart: number) => {
    //xóa cart-detail
    await prisma.cartDetail.delete({
        where: {
            id: cartDetailId
        }
    })

    if (sumCart === 1) {
        //xóa cart
        await prisma.cart.delete({
            where: {
                userId: userId
            }
        })
    } else {
        await prisma.cart.update({
            where: { userId },
            data: {
                sum: {
                    decrement: 1
                }
            }
        })
    }
}

const updateCartDetailBeforeCheckout = async (data: { id: string; quantity: string }[]) => {
    for (let i = 0; i < data.length; i++) {
        await prisma.cartDetail.update({
            where: { id: +(data[i].id) },
            data: {
                quantity: +(data[i].quantity)
            }
        })
    }
}

const handlerPlaceOrder = async (
    receiverName: string,
    receiverAddress: string,
    receiverPhone: string,
    totalPrice: number,
    userId: number) => {

    const cart = await prisma.cart.findUnique({
        where: {
            userId
        },
        include: {
            cartDetails: true
        }
    })

    const orderDetails = cart?.cartDetails.map(item => ({
        price: item.price,
        quantity: item.quantity,
        productId: item.productId
    })) ?? []

    if (cart) {
        //create order and order-detail
        await prisma.order.create({
            data: {
                totalPrice: +totalPrice,
                receiverAddress: receiverAddress,
                receiverName: receiverName,
                receiverPhone: receiverPhone,
                status: "PENDING",
                paymentMethod: "COD",
                paymentStatus: "PAYMENT_UNPAID",
                userId: userId,
                orderDetails: {
                    create: orderDetails
                }
            }
        })

        //remove cart and cart-detail
        await prisma.cartDetail.deleteMany({
            where: {
                cartId: cart?.id
            }
        })

        await prisma.cart.delete({
            where: {
                id: cart?.id
            }
        })
    }
}


const getOrderHistory = async (userId: number) => {
    return await prisma.order.findMany({
        where: { userId },
        include: {
            orderDetails: {
                include: { product: true }
            }
        }
    })
}

export { getAllProduct, getProductById, addProductToCart, getProductInCart, deleteProductInCart, updateCartDetailBeforeCheckout, handlerPlaceOrder, getOrderHistory }