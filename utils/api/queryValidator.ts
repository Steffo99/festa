import { default as Ajv, JSONSchemaType } from "ajv"
import { ParsedUrlQuery } from "querystring"
import { Response } from "./throwables"

/**
 * Object containing data related to API request "query" (the `req.query` object, an instance of {@link ParsedUrlQuery}) validation.
 * 
 * Since validation is performed **before** HEAD and OPTIONS requests are answered, there is no schema.
 * 
 * @see {@link FestaBodyValidator}, {@link festaAPI} and its parameters {@link FestaAPI}.
 */
export type FestaQueryValidator<Config, Query> = {
    /**
     * Async function which validates the request query, ensuring it follows the {@link FestaQueryValidator.schema}.
     * 
     * Any thrown {@link Error} should be caught by the handler, and its {@link Error.message} returned by the API.
     * 
     * @param config - The current configuration of the request handler.
     * @param query - The deserialized contents of the request query.
     * @throws {ThrowableResponse}
     */
    perform: (params: { config: Config, query: any }) => Promise<Query>,
}


/**
 * {@link FestaQueryValidator} which ignores the query.
 * 
 * Never throws.
 */
export const festaNoQuery: FestaQueryValidator<any, {}> = {
    perform: async ({ }) => {
        return {}
    },
}


/**
 * Factory of {@link FestaQueryValidator}s using JSON Schema to perform the validation.
 * 
 * _TypeScript note: `schema` parameter validation has been turned off because it was pointlessly annoying.
 * 
 * @param {JSONSchemaType} schema - The {@link JSONSchemaType} to be used in validation.
 */
export function festaJsonSchemaQuery<Query>(schema: any /* JSONSchemaType<Body> */): FestaQueryValidator<any, Query> {
    const ajv = new Ajv()
    const validate = ajv.compile(schema)

    return {
        perform: async ({ query }) => {
            const valid = validate(query)

            if (!valid) {
                throw new Response({
                    status: 404,
                    body: {
                        error: validate.errors!.map(error => error.message).join(" + "),
                        validation: validate.errors!.map(error => {
                            const obj: { [_: string]: string } = {}
                            obj[error.keyword] = error.message!
                            return obj
                        }).reduce((a, b) => {
                            return { ...a, ...b }
                        }, {})
                    }
                })
            }

            return query as Query
        }
    }
}
