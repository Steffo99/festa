import { Response as Response } from "./throwables"
import { Token, User } from "@prisma/client"
import { database } from "../prismaClient"

/**
 * Object containing multiple functions related to API authentication.
 * 
 * @see {@link festaAPI} and its parameters {@link FestaAPI}.
 */
export type FestaAuthenticator<Config, Auth> = {
    /**
     * The value that the `WWW-Authenticate` header should be set to in a handler using this authenticator.
     */
    header: string,

    /**
     * Async function which uses the value of the `Authorization` HTTP header to authenticate the user agent performing the API request.
     * 
     * Any thrown {@link Error} should be caught by the handler, and its {@link Error.message} returned by the API.
     * 
     * @param config - The current configuration of the request handler.
     * @param header - The value of the `Authorization` HTTP header.
     * @throws {ThrowableResponse}
     */
    perform: (params: { config: Config, header: string | undefined }) => Promise<Auth>,
}


/**
 * {@link FestaAuthenticator} which does not require any authentication.
 * 
 * Never throws.
 */
export const festaNoAuth: FestaAuthenticator<any, {}> = {
    header: "",
    perform: async ({ }) => {
        return {}
    },
}


/**
 * Structure of the authentication data returned by the Festa API.
 */
export type FestaToken = Token & { user: User }


/**
 * {@link FestaAuthenticator} which authenticates the user agent based on the value of its Bearer token.
 * 
 * Returns the {@link FestaToken} if successful, or `undefined` if the Authorization header is missing.
 * 
 * Throws an HTTP 401 error if the header is malformed or the token is invalid or expired.
 */
export const festaBearerAuthOptional: FestaAuthenticator<any, FestaToken | undefined> = {
    header: "Bearer",
    perform: async ({ header }) => {
        if (!header || header === "false") {
            return undefined
        }

        const token = header.match(/^Bearer (\S+)$/)?.[1]

        if (!token) {
            throw Response.error({ status: 401, message: "Malformed Authorization header" })
        }

        const dbToken = await database.token.findUnique({ where: { token }, include: { user: true } })
        if (!dbToken) {
            throw Response.error({ status: 401, message: "Invalid Authorization token" })
        }

        const now = new Date()
        if (dbToken.expiresAt.getTime() < now.getTime()) {
            throw Response.error({ status: 401, message: "Expired Authorization token" })
        }

        return dbToken
    }
}

/**
 * {@link FestaAuthenticator} which authenticates the user agent based on the value of its Bearer token.
 * 
 * Returns the {@link FestaToken} if successful.
 * 
 * Throws an HTTP 401 error if the header is missing or malformed, or the token is invalid or expired.
 */
export const festaBearerAuthRequired: FestaAuthenticator<any, FestaToken> = {
    header: "Bearer",
    perform: async (params) => {
        if (!params.header) {
            throw Response.error({ status: 401, message: "Missing Authorization header" })
        }

        return await festaBearerAuthOptional.perform(params) as FestaToken
    }
}
