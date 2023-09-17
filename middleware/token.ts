import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TokenProp, TokenPayload } from "../@types/Token";
import User from "../db/models/user";

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



export const Tokenadmin = async (
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
			
			const { isAdmin, id } = response as TokenPayload

			// Verifique se o usuário é um administrador
			const userIsAdmin = isAdmin; // Supondo que o campo seja chamado 'isAdmin'

			const resultDB = await User.findOne({where: {id: id, isAdmin: userIsAdmin}})

			if(resultDB){
				next();
			}else{
				res.status(403).json({ msg: 'Acesso não autorizado' });
			}

		} catch (error) {
			res.redirect("/");
		}
	}
};