import { Router } from "express";
import csrf from "csurf";
import { toEnter, SingIn } from "./controller/authController";
import { admin, tokenAdmin, usuarioAdmin } from './controller/adminController'
import { live } from "./controller/liveController";
import { home } from "./controller/homeController";
import { token, Tokenadmin, TokenServer } from "./middleware/token";
import { sendMensage } from "./controller/sendMensageController";
import { file, sftpPut, sftdownload, sftpList, fileInsert } from "./controller/fileController";
import { gerarToken } from "./controller/tokenController";

const csrfProtection = csrf({ cookie: true });

export const router = Router();

router.get("/", csrfProtection, SingIn);
router.post("/toEnter", csrfProtection, toEnter);
router.get("/home", csrfProtection, token, home);
router.get("/live/:token/:chave", live);
router.post("/sendMensage", TokenServer, sendMensage);
router.post('/getvideo/babe/stream', file)

router.post('/put', token, sftpPut)
router.get('/list', csrfProtection, token, sftpList)
router.get('/download/:file', csrfProtection, token, sftdownload)
router.post('/insert/file', TokenServer, fileInsert)
router.post('/gerar/token', gerarToken)

router.get('/admin', csrfProtection, Tokenadmin, admin)
router.get('/admin/usuario', csrfProtection, Tokenadmin, usuarioAdmin)
router.get('/admin/token', csrfProtection, Tokenadmin, tokenAdmin)