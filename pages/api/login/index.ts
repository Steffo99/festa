import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../utils/prismaClient"
import { TelegramUserDataClass } from "../../../utils/TelegramUserDataClass"
import { default as cryptoRandomString } from "crypto-random-string"
import { ApiResult } from "../../../types/api"
import { FestaLoginData } from "../../../types/user"


export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResult<FestaLoginData>>) {
    switch (req.method) {
        case "OPTIONS":
            return res.status(200).send("")
        case "POST":
            switch(req.query.provider) {
                case "telegram":
                    return await loginTelegram(req, res)
                default: 
                    return res.status(400).json({ error: "Unknown login provider" })
            }
        default:
            return res.status(405).json({ error: "Invalid method" })
    }
}


async function loginTelegram(req: NextApiRequest, res: NextApiResponse<ApiResult<FestaLoginData>>) {
    const botToken = process.env.TELEGRAM_TOKEN
    if (!botToken) {
        return res.status(503).json({ error: "`TELEGRAM_TOKEN` was not set up" })
    }

    const hashExpirationMs = parseInt(process.env.TELEGRAM_HASH_EXPIRATION_MS!)
    if (!hashExpirationMs) {
        return res.status(503).json({ error: "`TELEGRAM_HASH_EXPIRATION_MS` was not set up" })
    }

    const tokenExpirationMs = parseInt(process.env.FESTA_TOKEN_EXPIRATION_MS!) // Wrong typing?
    if (!tokenExpirationMs) {
        return res.status(503).json({ error: "`FESTA_TOKEN_EXPIRATION_MS` was not set up" })
    }

    try {
        var userData: TelegramUserDataClass = new TelegramUserDataClass(req.body)
    }
    catch (_) {
        return res.status(422).json({ error: "Malformed data" })
    }

    if (!userData.isRecent(hashExpirationMs)) {
        return res.status(408).json({ error: "Telegram login data is not recent" })
    }

    if (!userData.isValid(botToken)) {
        return res.status(401).json({ error: "Telegram login data has been tampered" })
    }

    const accountTelegram = await prisma.accountTelegram.upsert({
        where: {
            telegramId: userData.id
        },
        create: {
            ...userData.toDatabase(),
            user: {
                create: {
                    displayName: userData.toTelegramName(),
                    displayAvatarURL: userData.photoUrl,
                }
            }
        },
        update: {
            ...userData.toDatabase(),
            user: {
                update: {}
            }
        }
    })

    const token = await prisma.token.create({
        data: {
            userId: accountTelegram.userId,
            token: cryptoRandomString({ length: 16, type: "base64" }),
            expiresAt: new Date(userData.authDate.getTime() + tokenExpirationMs)
        },
        include: {
            user: true,
        }
    })

    return res.status(200).json(token)
}