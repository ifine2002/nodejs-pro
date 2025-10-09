import { Request, Response } from 'express';
import { addProductToCart, deleteProductInCart, getProductById, getProductInCart, handlerPlaceOrder, updateCartDetailBeforeCheckout } from 'services/client/item.service';

const getProductDetail = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await getProductById(id);
    return res.render("client/product/detail", {
        product
    });
}

const postAddProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (user) {
        await addProductToCart(1, +id, user);
    } else {
        return res.redirect("/login");
    }
    return res.redirect("/");
}

const getCartPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login");
    const cartDetails = await getProductInCart(+user.id);

    const totalPrice = cartDetails?.map(item => +item.price * +item.quantity)?.reduce((a, b) => a + b, 0)

    return res.render("client/product/cart", { cartDetails, totalPrice });
}

const postDeleteProductInCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (user) {
        await deleteProductInCart(+id, user.id, user.sumCart);
    }

    return res.redirect("/cart");
}

const getCheckOutPage = async (req: Request, res: Response) => {

    const user = req.user;
    if (!user) return res.redirect("/login");
    const cartDetails = await getProductInCart(+user.id);

    const totalPrice = cartDetails?.map(item => +item.price * +item.quantity)?.reduce((a, b) => a + b, 0)

    return res.render("client/product/checkout", { cartDetails, totalPrice });
}

const postHandleCartToCheckOut = async (req: Request, res: Response) => {

    const currentCartDetail: { id: string; quantity: string }[] = req.body?.cartDetails ?? [];

    await updateCartDetailBeforeCheckout(currentCartDetail);
    return res.redirect("/checkout");
}

const getPlaceOrder = async (req: Request, res: Response) => {

    const user = req.user;
    if (!user) return res.redirect("/login");

    return res.render("client/product/thanks");
}

const postPlaceOrder = async (req: Request, res: Response) => {

    const user = req.user;
    if (!user) return res.redirect("/login");

    const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body;

    await handlerPlaceOrder(receiverName, receiverAddress, receiverPhone, totalPrice, user.id);

    return res.redirect("/thanks");
}

export { getProductDetail, postAddProductToCart, getCartPage, postDeleteProductInCart, getCheckOutPage, postHandleCartToCheckOut, postPlaceOrder, getPlaceOrder };