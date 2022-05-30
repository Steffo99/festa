import { prisma } from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResult } from "../../../types/api";
import { restInPeace } from "../../../utils/restInPeace";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResult<Event | Event[]>>) {
    restInPeace(req, res, {
        model: prisma.event,
        isList: false,
        whereList: {},
        whereDetail: {
            slug: req.query.slug,
        },
        create: {
            slug: req.query.slug,
            // TODO
        },
        update: {
            // TODO
        },
    })
}