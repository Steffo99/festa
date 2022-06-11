import { database } from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { default as cryptoRandomString } from "crypto-random-string";
import { Event, Prisma } from "@prisma/client";
import { festaNoConfig } from "../../../utils/api/configurator";
import { festaBearerAuthRequired, FestaToken } from "../../../utils/api/authenticator";
import { festaJsonSchemaBody } from "../../../utils/api/bodyValidator";
import { festaAPI } from "../../../utils/api";
import { festaNoQuery } from "../../../utils/api/queryValidator";
import { festaRESTGeneric } from "../../../utils/api/executor";
import { Response } from "../../../utils/api/throwables";


type Config = {}

type Auth = FestaToken

type Query = {}

type Body = {
    name: string,
    postcard?: string,
    description: string,
    startingAt?: string,
    endingAt?: string,
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await festaAPI(req, res, {

        configurator: festaNoConfig,

        authenticator: festaBearerAuthRequired,

        queryValidator: festaNoQuery,

        bodyValidator: festaJsonSchemaBody<any>({
            type: "object",
            properties: {
                name: { type: "string", minLength: 1 },
                postcard: { type: "string", nullable: true },
                description: { type: "string", nullable: false },
                startingAt: { type: "string", nullable: true },
                endingAt: { type: "string", nullable: true },
            },
            required: [
                "name",
            ]
        }),

        executor: festaRESTGeneric<Config, Auth, Query, Body, Event, Prisma.EventDelegate<any>, Prisma.EventFindManyArgs, Prisma.EventCreateArgs>({
            delegate: database.event,

            getListArgs: async ({ }) => {
                throw Response.error({ status: 405, message: "Cannot list all events" })
            },

            getCreateArgs: async ({ auth, body }) => {
                return {
                    data: {
                        slug: cryptoRandomString({ length: 12, type: "alphanumeric" }),
                        creatorId: auth.userId,
                        name: body!.name,
                        postcard: body!.postcard ?? null,
                        description: body!.description,
                        startingAt: body!.startingAt ?? null,
                        endingAt: body!.endingAt ?? null,
                    }
                }
            },
        }),
    })
}
