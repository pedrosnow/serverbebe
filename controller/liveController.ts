import { Request, Response } from "express";
import Jwt from "jsonwebtoken";

export const live = (req: Request, res: Response) => {
	const { token, chave } = req.params;
	const steamLink = `http://localhost/hls/${chave}/index.m3u8`;
	try {
		const decoded = Jwt.verify(
			token,
			process.env.SECRET ? process.env.SECRET : ""
		);

		res.render("stream", { titulo: "Live", steamLink: steamLink });
	} catch (error) {
		res.render("notFound", { titulo: "Pagina não econtrada" });
	}
};
