import { Router } from "express";
import csrf from "csurf";
import { toEnter, SingIn } from "./controller/authController";
import { live } from "./controller/liveController";
import { home } from "./controller/homeController";
import { token } from "./middleware/token";
import { sendMensage } from "./controller/sendMensageController";
import { file } from "./controller/fileController";

const csrfProtection = csrf({ cookie: true });

export const router = Router();

router.get("/", csrfProtection, SingIn);
router.post("/toEnter", csrfProtection, toEnter);
router.get("/home", home);
router.get("/live/:token/:chave", live);
router.post("/sendMensage", sendMensage);
router.get('/teste', file)