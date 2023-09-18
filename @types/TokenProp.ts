import { JwtPayload } from "jsonwebtoken"

export type TokenProp = {
    token: String,
    tokenPayLoad: JwtPayload | string,
    celular: number,
	pacienteid: number,
	chave: string,
    acesso: string,
    file: string
}

export type TokenPayload = {
	isAdmin: boolean,
    id: number
}


export type TokenServerProp = {
    token:String,
    acesso: string,
    file: string
}