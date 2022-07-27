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

        executor: festaRESTGeneric<Config, Auth, Query, Body, Event, Prisma.UserDelegate<any>, Prisma.UserFindManyArgs, Prisma.UserCreateArgs>({
            delegate: database.user,

            getListArgs: async ({ auth }) => {
                return {
                    where: {
                        id: auth.userId,
                    }
                }
            },

            getCreateArgs: async ({ }) => {
                throw Response.error({ status: 405, message: "This route cannot be used to create new users" })
            },
        }),
    })
}
