import { User } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { client } from "./prismaClient"
import { Interrupt } from "./interrupt"


export async function authorizeUser(req: NextApiRequest, res: NextApiResponse): Promise<User> {
    const authorization = req.headers.authorization

    if (!authorization) {
        throw new Interrupt(401, {error: "Missing Authorization header" })
    }

    const token = authorization.match(/^Bearer (\S+)$/)?.[1]
    
    if(!(token)) {
        throw new Interrupt(401, {error: "Invalid Authorization header" })
    }

    const dbToken = await client.token.findUnique({where: {token}, include: {user: true}})
    
    if(!(dbToken)) {
        throw new Interrupt(401, {error: "No such Authorization token" })
    }

    return dbToken.user
}