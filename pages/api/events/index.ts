import { database } from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResult } from "../../../types/api";
import { Model, restInPeace } from "../../../utils/restInPeace";
import { default as cryptoRandomString } from "crypto-random-string";
import { handleInterrupts, Interrupt } from "../../../utils/interrupt";
import { authorizeUser } from "../../../utils/authorizeUser";
import { Event } from "@prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResult<Event | Event[]>>) {
    handleInterrupts(res, async () => {
        const user = await authorizeUser(req)

        if (req.body.name.length === 0) {
            throw new Interrupt(400, { error: "Name is empty" })
        }

        const create = {
            slug: cryptoRandomString({ length: 12, type: "url-safe" }),
            creatorId: user.id,
            name: req.body.name
        }

        await restInPeace(req, res, {
            model: database.event,
            create: { create },
        })
    })
}