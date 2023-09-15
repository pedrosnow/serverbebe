import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TokenProp, TokenPayload } from "../@types/Token";

export const token = (
	req: Request<{}, {}, TokenProp>,
	res: Response,
	next: NextFunction
) => {
	const secret = process.env.SECRET;
	const token = req.cookies.token;	

	if (!token) {
		res.redirect("/");
	} else {
		try {
			const response = jwt.verify(token, secret ? secret : "");
			if (response) {

				req.body.tokenPayLoad = response
				
				next();				

			} else {
				res.redirect("/");
			}
		} catch (error) {
			res.redirect("/");
		}
	}
};



export const Tokenadmin = (
	req: Request<{}, {}, TokenProp>,
	res: Response,
	next: NextFunction
) => {
	const secret = process.env.SECRET;
	const token = req.cookies.token;

	if (!token) {
		res.redirect("/");
	} else {
		try {
			const response = jwt.verify(token, secret ? secret : "");
			
			const { isAdmin } = response as TokenPayload

			// Verifique se o usuário é um administrador
			const userIsAdmin = isAdmin; // Supondo que o campo seja chamado 'isAdmin'

			if (userIsAdmin) {
				// Permita o acesso apenas se o usuário for um administrador
				next();

			} else {
				res.status(403).json({ msg: 'Acesso não autorizado' });
			}
		} catch (error) {
			res.redirect("/");
		}
	}
};