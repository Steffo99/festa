import { client } from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResult } from "../../../types/api";
import { restInPeace } from "../../../utils/restInPeace";
import { handleInterrupts } from "../../../utils/interrupt";
import { authorizeUser } from "../../../utils/authorizeUser";
import { Event } from "@prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResult<Event | Event[]>>) {
    handleInterrupts(res, async () => {
        const user = await authorizeUser(req)

        const where = {
            creatorId: user.id
        }
    
        await restInPeace(req, res, {
            model: client.event,
            list: {where}
        })
    })
}