import { Router } from "express";
import { toEnter, SingIn } from "./controller/authController";
import csrf from 'csurf';

const csrfProtection = csrf({ cookie: true });

export const router = Router()

router.get('/', csrfProtection, SingIn)
router.get('/toEnter', csrfProtection, toEnter)

