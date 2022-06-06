import { database } from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResult } from "../../../types/api";
import { Model, restInPeace } from "../../../utils/restInPeace";
import { handleInterrupts, Interrupt } from "../../../utils/interrupt";
import { authorizeUser } from "../../../utils/authorizeUser";
import { Event } from "@prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResult<Event | Event[]>>) {
    handleInterrupts(res, async () => {
        const user = await authorizeUser(req)

        const canEdit = async (_model: Model, obj?: Event) => {
            if(obj && obj.creatorId !== user.id) {
                throw new Interrupt(403, {error: "Only the creator can edit an event"})
            }
        }

        const which = {
            slug: req.query.slug,
        }
        const update = {
            name: req.body.name,
            postcard: req.body.postcard ?? null,
            description: req.body.description,
            startingAt: req.body.startingAt,
            endingAt: req.body.endingAt,
        }
    
        await restInPeace(req, res, {
            model: database.event,
            retrieve: {which},
            update: {which, update, before: canEdit},
            destroy: {which, before: canEdit},
        })
    })
}