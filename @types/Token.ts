import { JwtPayload } from "jsonwebtoken"

export type TokenProp = {
    token: String,
    tokenPayLoad: JwtPayload | string
}

export type TokenPayload = {
	isAdmin: boolean,
}
