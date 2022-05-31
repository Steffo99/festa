import { client } from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResult } from "../../../types/api";
import { restInPeace } from "../../../utils/restInPeace";
import { default as cryptoRandomString} from "crypto-random-string";
import { handleInterrupts } from "../../../utils/interrupt";
import { authorizeUser } from "../../../utils/apiAuth";
import { User } from "@prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResult<Event | Event[]>>) {
    handleInterrupts(res, async () => {
        const user = await authorizeUser(req, res)

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
    
        restInPeace(req, res, {
            model: client.event,
            retrieve: {which},
            create: {create},
            // TODO: this might prove problematic
        })
    })
}