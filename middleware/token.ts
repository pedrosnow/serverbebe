import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { TokenProp } from '../@types/Token'

export const token = (req: Request<{},{}, TokenProp>, res: Response, next: NextFunction) => {
    
    const secret = process.env.SECRET
    const token = req.cookies.token

    if(!token){
        res.redirect('/')
    }else{
        try {
            const response = jwt.verify(token, (secret ? secret : ""))
            if(response){
                next()
            }else{
                res.redirect("/")
            }
        } catch (error) {
            res.redirect("/")
        }
    }

}
