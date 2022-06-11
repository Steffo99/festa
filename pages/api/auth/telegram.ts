import { database } from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { TelegramLoginObject } from "../../../components/auth/telegram/processing";
import { default as cryptoRandomString } from "crypto-random-string"
import { festaAPI } from "../../../utils/api";
import { festaNoAuth } from "../../../utils/api/authenticator";
import { festaJsonSchemaBody } from "../../../utils/api/bodyValidator";
import { TelegramLoginResponse } from "react-telegram-login";
import { Response } from "../../../utils/api/throwables";
import { festaNoQuery } from "../../../utils/api/queryValidator";


type Config = {
    botToken: string,
    hashExpirationMs: number,
    tokenExpirationMs: number,
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await festaAPI(req, res, {

        configurator: {
            perform: async () => {
                const botToken = process.env.TELEGRAM_TOKEN
                if (!botToken) {
                    throw Response.error({ status: 503, message: "`TELEGRAM_TOKEN` was not set up" })
                }
                const hashExpirationMs = parseInt(process.env.TELEGRAM_HASH_EXPIRATION_MS!)  // TypeScript type is wrong?
                if (!hashExpirationMs) {
                    throw Response.error({ status: 503, message: "`TELEGRAM_HASH_EXPIRATION_MS` was not set up" })
                }
                const tokenExpirationMs = parseInt(process.env.FESTA_TOKEN_EXPIRATION_MS!)  // TypeScript type is wrong?
                if (!tokenExpirationMs) {
                    throw Response.error({ status: 503, message: "`FESTA_TOKEN_EXPIRATION_MS` was not set up" })
                }

                return { botToken, hashExpirationMs, tokenExpirationMs }
            }
        },

        authenticator: festaNoAuth,

        queryValidator: festaNoQuery,

        bodyValidator: festaJsonSchemaBody<TelegramLoginResponse>({
            type: "object",
            properties: {
                id: { type: "integer" },
                first_name: { type: "string" },
                auth_date: { type: "integer" },
                hash: { type: "string" },
                last_name: { type: "string", nullable: true },
                username: { type: "string", nullable: true },
                photo_url: { type: "string", nullable: true },
                lang: { type: "string", nullable: true },
            },
            required: [
                "id",
                "first_name",
                "auth_date",
                "hash",
            ]
        }),

        executor: {
            methods: ["POST"],
            perform: async ({ config, body }) => {
                try {
                    var tlo: TelegramLoginObject = new TelegramLoginObject(body!)
                }
                catch (e) {
                    throw Response.error({ status: 422, message: "Telegram Login response validation failed" })
                }

                if (!tlo.isRecent(config.hashExpirationMs)) {
                    throw Response.error({ status: 408, message: "Telegram login data is not recent" })
                }

                if (!tlo.isValid(config.botToken)) {
                    throw Response.error({ status: 401, message: "Telegram login data has been tampered" })
                }

                const accountTelegram = await database.accountTelegram.upsert({
                    where: {
                        telegramId: tlo.id
                    },
                    create: {
                        ...tlo.toDatabase(),
                        user: {
                            create: {
                                displayName: tlo.toTelegramName(),
                                displayAvatarURL: tlo.photoUrl,
                            }
                        }
                    },
                    update: {
                        ...tlo.toDatabase(),
                        user: {
                            update: {
                                displayName: tlo.toTelegramName(),
                                displayAvatarURL: tlo.photoUrl,
                            }
                        }
                    }
                })

                const token = await database.token.create({
                    data: {
                        userId: accountTelegram.userId,
                        token: cryptoRandomString({ length: 16, type: "base64" }),
                        expiresAt: new Date(tlo.authDate.getTime() + config.tokenExpirationMs)
                    },
                    include: {
                        user: true,
                    }
                })

                return token
            }
        },
    })
}
