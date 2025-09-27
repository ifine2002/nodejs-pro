import { Request, Response } from 'express';
import { createProduct, getProductById, handleDeleteProduct, updateProduct } from 'services/admin/product.service';
import { ProductSchema, TProductSchema } from 'src/validation/product.schema';

const getCreateProductPage = (req: Request, res: Response) => {
    const errors = {};
    const oldData = {
        name: '',
        price: '',
        detailDesc: '',
        shortDesc: '',
        quantity: '',
        factory: '',
        target: ''
    }
    res.render('admin/product/create', { errors, oldData });
}

const postCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, factory, target, quantity } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);

    if (!validate.success) {
        const errorsZod = validate.error.flatten().fieldErrors;
        const oldData = {
            name, price, detailDesc, shortDesc, factory, target, quantity
        }
        return res.render('admin/product/create', { errors: errorsZod, oldData });
    }
    //success, create a new product
    const image = req?.file?.filename ?? null;
    await createProduct(name, +price, detailDesc, shortDesc, factory, target, +quantity, image);
    return res.redirect('/admin/product');
}

const postUpdateProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { name, price, detailDesc, shortDesc, factory, target, quantity, currentImage } = req.body as TProductSchema & { currentImage?: string };
    const validate = ProductSchema.safeParse(req.body);
    const product = await getProductById(productId);

    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];

    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];

    // Xử lý image với logic ưu tiên:
    // 1. File mới upload (req.file.filename)
    // 2. currentImage từ hidden input (file đã upload trước đó khi có lỗi validation)
    // 3. Image từ database (product.image)
    // 4. null nếu không có gì
    let image = req?.file?.filename ?? currentImage ?? product?.image ?? null;

    if (!validate.success) {
        const errorsZod = validate.error.flatten().fieldErrors;

        const oldData = {
            name,
            price,
            detailDesc,
            shortDesc,
            factory,
            target,
            quantity,
            image // Này sẽ được dùng để hiển thị ảnh và làm giá trị cho currentImage
        };

        return res.render('admin/product/detail', {
            errors: errorsZod,
            oldData,
            productId,
            factoryOptions,
            targetOptions,
            product
        });
    }

    // Success, update the product
    await updateProduct(+productId, name, +price, detailDesc, shortDesc, factory, target, +quantity, image);
    return res.redirect('/admin/product');
}

const getViewProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await getProductById(productId);
    const errors = {}
    const oldData = {}
    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];

    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];

    return res.render('admin/product/detail', {
        product: product,
        productId: productId,
        errors,
        factoryOptions,
        targetOptions,
        oldData
    });
}

const postDeleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    await handleDeleteProduct(productId);
    return res.redirect('/admin/product');
}
export { getCreateProductPage, postCreateProduct, getViewProduct, postUpdateProduct, postDeleteProduct };