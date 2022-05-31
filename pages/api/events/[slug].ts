import { client } from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResult } from "../../../types/api";
import { Model, restInPeace } from "../../../utils/restInPeace";
import { default as cryptoRandomString} from "crypto-random-string";
import { handleInterrupts, Interrupt } from "../../../utils/interrupt";
import { authorizeUser } from "../../../utils/apiAuth";
import { Event } from "@prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResult<Event | Event[]>>) {
    handleInterrupts(res, async () => {
        const user = await authorizeUser(req, res)

        const canEdit = async (model: Model, obj?: Event) => {
            if(obj && obj.creatorId !== user.id) {
                throw new Interrupt(403, {error: "Only the creator can edit an event"})
            }
        }

        const which = {
            slug: req.query.slug
        }
        const create = {
            slug: cryptoRandomString({length: 12, type: "url-safe"}),
            creatorId: user.id,
            name: req.body.name
        }
        const update = {
            name: req.body.name
        }
    
        await restInPeace(req, res, {
            model: client.event,
            retrieve: {which},
            create: {create},
            upsert: {which, create, update, before: canEdit},
            update: {which, update, before: canEdit},
            destroy: {which, before: canEdit},
        })
    })
}