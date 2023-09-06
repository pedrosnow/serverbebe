import { Router } from "express";
import { Auth } from "./controller/authController";
import csrf from 'csurf';

const csrfProtection = csrf({ cookie: true });

export const router = Router()

router.get('/', csrfProtection, (req: Request, res: Response) =>{
    res.render('home', { csrfToken: req.csrfToken() })
})

router.post('/singIn', csrfProtection, Auth)

