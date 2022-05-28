import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../utils/prismaClient"
import * as Telegram from "../../../utils/telegram"
import {default as cryptoRandomString} from "crypto-random-string"



export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case "POST":
            const token = process.env.TELEGRAM_TOKEN
            const validity_ms = parseInt(process.env.FESTA_TOKEN_VALIDITY_MS!) // Wrong typing?
            const now = new Date()

            if(!token) {
                return res.status(503).json({error: "`TELEGRAM_TOKEN` was not set up"})
            }
            if(!validity_ms) {
                return res.status(503).json({error: "`FESTA_TOKEN_VALIDITY_MS` was not set up"})
            }

            try {
                var lr: Telegram.LoginResponse = new Telegram.LoginResponse(req.body)
            }
            catch(_) {
                return res.status(422).json({error: "Malformed data"})
            }

            if(!lr.isRecent()) {
                // Not sure?
                return res.status(408).json({error: "Telegram login data is not recent"})
            }
            
            if(!lr.isValid(token)) {
                return res.status(401).json({error: "Telegram login data has been tampered"})
            }

            prisma.user.upsert({
                where: {
                    id: lr.id,
                },
                update: {
                    id: lr.id,
                    firstName: lr.first_name,
                    lastName: lr.last_name,
                    username: lr.username,
                    photoUrl: lr.photo_url,
                    lastAuthDate: now,
                },
                create: {
                    id: lr.id,
                    firstName: lr.first_name,
                    lastName: lr.last_name,
                    username: lr.username,
                    photoUrl: lr.photo_url,
                    lastAuthDate: now,
                }
            })

            const tokenString = cryptoRandomString({length: 16, type: "base64"})
            const tokenExpiration = new Date(+ now + validity_ms)
            
            prisma.token.create({
                data: {
                    userId: lr.id,
                    token: tokenString,
                    expiresAt: tokenExpiration,
                }
            })

            return res.status(200).json({
                token: tokenString,
                expiresAt: tokenExpiration.toISOString(),
            })

        default:
            return res.status(405).json({error: "Invalid method"})
    }
}