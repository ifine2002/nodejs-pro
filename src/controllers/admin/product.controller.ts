import { Request, Response } from 'express';

const getCreateProductPage = (req: Request, res: Response) => {
    res.render('admin/product/create');
}

const postCreateProduct = (req: Request, res: Response) => {
    const { name, price } = req.body;

    return res.redirect('/admin/product');
}

export { getCreateProductPage, postCreateProduct };