import { database } from "../../../utils/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { Event, Prisma } from "@prisma/client";
import { festaAPI } from "../../../utils/api";
import { festaNoConfig } from "../../../utils/api/configurator";
import { festaBearerAuthOptional, FestaToken } from "../../../utils/api/authenticator";
import { festaJsonSchemaBody } from "../../../utils/api/bodyValidator";
import { festaRESTSpecific } from "../../../utils/api/executor";
import { festaJsonSchemaQuery } from "../../../utils/api/queryValidator";
import { Response } from "../../../utils/api/throwables";


type Config = {}

type Auth = FestaToken | undefined

type Query = {
    slug: string
}

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

        authenticator: festaBearerAuthOptional,

        queryValidator: festaJsonSchemaQuery<Query>({
            type: "object",
            properties: {
                slug: { type: "string" }
            },
            required: [
                "slug",
            ]
        }),

        bodyValidator: festaJsonSchemaBody<Body>({
            type: "object",
            properties: {
                name: { type: "string" },
                postcard: { type: "string", nullable: true },
                description: { type: "string" },
                startingAt: { type: "string", nullable: true },
                endingAt: { type: "string", nullable: true },
            },
            required: [
                "slug",
                "name",
                "description",
            ]
        }),

        executor: festaRESTSpecific<Config, Auth, Query, Body, Event, Prisma.EventDelegate<any>, Prisma.EventFindUniqueArgs, Prisma.EventUpdateArgs>({
            delegate: database.event,

            getFindArgs: async ({ query }) => {
                return {
                    where: {
                        slug: query.slug,
                    }
                }
            },

            beforeUpdate: async ({ auth }, item) => {
                if (!auth) {
                    throw Response.error({ status: 403, message: "Authentication is required to edit events" })
                }

                if (item && item.creatorId !== auth.user.id) {
                    throw Response.error({ status: 403, message: "Only the creator can edit an event" })
                }
            },

            getUpdateArgs: async ({ body, query }) => {
                return {
                    where: {
                        slug: query.slug,
                    },
                    data: body!,
                }
            },

            beforeDestruction: async ({ auth }, item) => {
                if (!auth) {
                    throw Response.error({ status: 403, message: "Authentication is required to destroy events" })
                }

                if (item && item.creatorId !== auth.user.id) {
                    throw Response.error({ status: 403, message: "Only the creator can destroy an event" })
                }
            },

            getDestroyArgs: async ({ query }) => {
                return {
                    where: {
                        slug: query.slug,
                    }
                }
            }
        }),
    })
}
