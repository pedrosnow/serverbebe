

import { AuthProps } from "../@types/auth"
import { Request, Response } from "express"

import User from "../db/models/user"

export const SingIn = (req: Request<{},{}, AuthProps> , res: Response) => {
    
    res.render('home', { csrfToken: req.csrfToken() })

}

export const toEnter = async (req: Request<{},{}, AuthProps> , res: Response) =>{
    
    const user = await User.findAll()

    res.send(user)

}