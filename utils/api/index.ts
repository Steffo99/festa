import { NextApiRequest, NextApiResponse } from "next";
import { FestaAuthenticator } from "./authenticator";
import { FestaConfigurator } from "./configurator";
import { FestaExecutor } from "./executor";
import { Response as Response } from "./throwables";
import { FestaBodyValidator } from "./bodyValidator";
import { FestaQueryValidator } from "./queryValidator";


/**
 * Parameters of {@link festaAPI}.
 */
type FestaAPI<Config, Auth, Query, Body, Response> = {
    configurator: FestaConfigurator<Config>,
    queryValidator: FestaQueryValidator<Config, Query>,
    authenticator: FestaAuthenticator<Config, Auth>,
    bodyValidator: FestaBodyValidator<Config, Body>,
    executor: FestaExecutor<Config, Auth, Query, Body, Response>,
}


export async function festaAPI<Config, Query, Auth, Body, Response>(req: NextApiRequest, res: NextApiResponse, { configurator, authenticator, queryValidator, bodyValidator, executor }: FestaAPI<Config, Query, Auth, Body, Response>): Promise<void> {
    await Response.handle(res, async () => {

        // Set the Access-Control-Allow-Origin header
        res.setHeader("Access-Control-Allow-Origin", "*")

        // Set the WWW-Authenticate header
        res.setHeader("WWW-Authenticate", authenticator.header)

        // Set the Allow header
        res.setHeader("Allow", ["HEAD", "OPTIONS", ...executor.methods].join(", "))

        // Get configuration
        const config = await Response.convertThrownErrors(
            async () => await configurator.perform(),
            "Server is not configured appropriately to handle this request"
        )

        // Validate the request query
        const query = await Response.convertThrownErrors(
            async () => await queryValidator.perform({ config, query: req.query }),
            "Unexpected error occurred during validation of this request"
        )

        // Head requests cut-off here
        if (req.method === "HEAD") {
            throw new Response({ status: 204 })
        }

        // Options requests cut-off here
        if (req.method === "OPTIONS") {
            // If validation is not performed, no body is sent to OPTIONS requests
            if (!bodyValidator.schema) {
                throw new Response({ status: 204 })
            }
            else {
                throw new Response({ status: 200, body: bodyValidator.schema })
            }
        }

        // Perform user agent authentication
        const auth = await Response.convertThrownErrors(
            async () => await authenticator.perform({ config, header: req.headers.authorization }),
            "Unexpected error occurred during authentication of this request"
        )

        // Get requests shouldn't have a body
        let body: Body | undefined = undefined
        if (req.method !== "GET") {
            // Validate the request body
            body = await Response.convertThrownErrors(
                async () => await bodyValidator.perform({ config, body: req.body }),
                "Unexpected error occurred during validation of this request"
            )
        }

        // Act on the data and determine a response
        const result = await Response.convertThrownErrors(
            async () => await executor.perform({ config, auth, query, body, method: req.method! }),
            "Unexpected error occurred during execution of this request"
        )

        throw new Response({ status: 200, body: result })
    })
}
