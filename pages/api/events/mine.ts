import { database } from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { Event, Prisma } from "@prisma/client";
import { festaNoConfig } from "../../../utils/api/configurator";
import { festaBearerAuthRequired, FestaToken } from "../../../utils/api/authenticator";
import { festaAPI } from "../../../utils/api";
import { festaNoQuery } from "../../../utils/api/queryValidator";
import { festaNoBody } from "../../../utils/api/bodyValidator";
import { festaRESTGeneric } from "../../../utils/api/executor";
import { Response } from "../../../utils/api/throwables";


type Config = {}

type Auth = FestaToken

type Query = {}

type Body = {}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await festaAPI(req, res, {

        configurator: festaNoConfig,

        authenticator: festaBearerAuthRequired,

        queryValidator: festaNoQuery,

        bodyValidator: festaNoBody,

        executor: festaRESTGeneric<Config, Auth, Query, Body, Event, Prisma.EventDelegate<any>, Prisma.EventFindManyArgs, Prisma.EventCreateArgs>({
            delegate: database.event,

            getListArgs: async ({ auth }) => {
                return {
                    where: {
                        creatorId: auth.userId,
                    }
                }
            },

            getCreateArgs: async ({ }) => {
                throw Response.error({ status: 405, message: "This route cannot be used to create new events" })
            },
        }),
    })
}
