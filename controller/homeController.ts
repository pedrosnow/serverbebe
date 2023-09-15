import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const home = (req: Request, res: Response) => {
	
	res.render("home", { titulo: "Home" });
	
};
