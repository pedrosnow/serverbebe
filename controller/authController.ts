import { AuthProps } from "../@types/auth";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../db/models/user";

export const SingIn = (
	req: Request<{}, {}, AuthProps>,
	res: Response
) => {
	res.render("singIn", {
		csrfToken: req.csrfToken(),
		titulo: "Entrar",
	});
};

export const toEnter = async (
	req: Request<{}, {}, AuthProps>,
	res: Response
) => {
	const { acesso, senha } = req.body;

	try {
		const secret = process.env.SECRET;
		const Users = await User.findOne({ where: { acesso: acesso } });

		if (Users) {
			const result = await bcrypt.compare(senha, Users.password);
			if (result) {
				const user = { id: Users.id, isAdmin: Users.isAdmin, acesso: Users.acesso };
				const token = jwt.sign(user, secret ? secret : "", {expiresIn: '4h' });
				res.status(200).json({ token: token, url: "/home", status: 200});
			} else {
				res.status(404).json({ msg: "usuario ou senha incorreto", status: 401 });
			}
		} else {
			res.status(404).json({ msg: "usuario ou senha incorreto", status: 401 });
		}
	} catch (error) {
		res.status(404).json({ msg: "usuario ou senha incorreto", status: 401 });
	}
};
