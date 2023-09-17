import { Request, Response } from "express";

export const admin = (req: Request, res: Response) =>{
    res.render("admin/index")
}


export const tokenAdmin = (req:Request, res: Response) =>{
    res.render('admin/token')
}

export const usuarioAdmin = (req:Request, res: Response) =>{
    res.render('admin/usuario')
}