import { Request, Response } from "express"
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export const gerarToken = (req:Request, res:Response) => {

    const { chave } = req.body

    const secretKey =(secret ? secret : "")
    
    // Defina o payload (conteúdo) do seu token
    const payload = { chave: chave };

    // Defina o tempo de expiração do token em segundos ou uma string válida
    // const expiresIn = '4h';

    try {

        const token = jwt.sign(payload, secretKey);

        res.status(200).json({msg: 'sucesso', token: token})
        
    } catch (error) {

        console.log(error)
        
        throw Error('Erro ao gerar p token')

    }
}