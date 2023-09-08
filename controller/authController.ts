

import { AuthProps } from "../@types/auth"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import User from "../db/models/user"

export const SingIn = (req: Request<{},{}, AuthProps> , res: Response) => {
    
    res.render('home', { csrfToken: req.csrfToken() })

}

export const toEnter = async (req: Request<{},{}, AuthProps> , res: Response) =>{

    const {acesso, senha } = req.body
    
    try {
        const secret = process.env.SECRET
        const Users = await User.findOne({where: {acesso: acesso}})

        if(Users){
            const result = await bcrypt.compare(senha, Users.password)
            if(result){
                
                const user = {id: Users.id}
                const token = jwt.sign(user, (secret ? secret : ""))
                res.status(404).json({token: token, url: "/home"})

            }else{
                res.status(404).json({msg: "usuario ou senha incorreto"})
            } 
            
        }else{
            res.status(404).json({msg: "usuario ou senha incorreto"})
        }  
    
    } catch (error) {
        res.status(404).json({msg: "usuario ou senha incorreto"}) 
    }

}