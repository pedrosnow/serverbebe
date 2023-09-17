import { JwtPayload } from "jsonwebtoken"

export type TokenProp = {
    token: String,
    tokenPayLoad: JwtPayload | string,
    celular: number,
	pacienteid: number,
	chave: string,
}

export type TokenPayload = {
	isAdmin: boolean,
    id: number
}
