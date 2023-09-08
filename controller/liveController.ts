import { Request, Response } from "express"

export const live = (req:Request, res:Response) => {
    res.send('ola')
}