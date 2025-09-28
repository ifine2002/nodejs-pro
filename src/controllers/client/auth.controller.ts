import { Request, Response } from "express"
import { registerNewUser } from "services/client/auth.service";
import { RegisterSchema, TRegisterSchema } from "src/validation/register.schema";

const getLoginPage = (req: Request, res: Response) => {
    const { session } = req as any;
    const messages = session?.messages ?? [];
    return res.render('client/auth/login', { messages });
}

const getRegisterPage = (req: Request, res: Response) => {
    const errors = {};
    const oldData = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    return res.render('client/auth/register', { errors, oldData });
}

const postRegister = async (req: Request, res: Response) => {
    const { fullName, email, password, confirmPassword } = req.body as TRegisterSchema
    const validate = await RegisterSchema.safeParseAsync(req.body)

    if (!validate.success) {
        const errorsZod = validate.error.flatten().fieldErrors;
        const oldData = {
            fullName, email, password, confirmPassword
        };

        return res.render('client/auth/register', {
            errors: errorsZod,
            oldData
        });
    }
    //success
    await registerNewUser(fullName, email, password);
    return res.redirect('/login');
}


export { getLoginPage, getRegisterPage, postRegister }