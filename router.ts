import { Router } from "express";
import csrf from 'csurf';
import { toEnter, SingIn } from "./controller/authController";
import { live } from "./controller/liveController";

const csrfProtection = csrf({ cookie: true });

export const router = Router()

router.get('/', csrfProtection, SingIn)
router.post('/toEnter', csrfProtection, toEnter)
router.get('/live', live)
