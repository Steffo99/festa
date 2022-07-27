import { database } from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { Event, Prisma, User } from "@prisma/client";
import { festaAPI } from "../../../utils/api";
import { festaNoConfig } from "../../../utils/api/configurator";
import { festaBearerAuthOptional, festaNoAuth, FestaToken } from "../../../utils/api/authenticator";
import { festaJsonSchemaBody, festaNoBody } from "../../../utils/api/bodyValidator";
import { festaRESTSpecific } from "../../../utils/api/executor";
import { festaJsonSchemaQuery } from "../../../utils/api/queryValidator";
import { Response } from "../../../utils/api/throwables";


type Config = {}

type Auth = {}

type Query = {
    id: string
}

type Body = {}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await festaAPI(req, res, {

        configurator: festaNoConfig,

        authenticator: festaNoAuth,

        queryValidator: festaJsonSchemaQuery<Query>({
            type: "object",
            properties: {
                id: { type: "string" }
            },
            required: [
                "id",
            ]
        }),

        bodyValidator: festaNoBody,

        executor: festaRESTSpecific<Config, Auth, Query, Body, User, Prisma.UserDelegate<any>, Prisma.UserFindUniqueArgs, Prisma.UserUpdateArgs>({
            delegate: database.user,

            getFindArgs: async ({ query }) => {
                return {
                    where: {
                        id: query.id,
                    }
                }
            },

            getUpdateArgs: async ({ body, query }) => {
                throw Response.error({ status: 405, message: "This route cannot be used to edit users" })
            },

            getDestroyArgs: async ({ query }) => {
                throw Response.error({ status: 405, message: "This route cannot be used to destroy users" })
            }
        }),
    })
}
