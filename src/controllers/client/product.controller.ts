import { Request, Response } from 'express';

const getProductDetail = (req: Request, res: Response) => {
    return res.render("client/product/detail");
}

export { getProductDetail };