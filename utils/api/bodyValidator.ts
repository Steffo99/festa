import { default as Ajv, JSONSchemaType } from "ajv"
import { Response } from "./throwables"

/**
 * Object containing data related to API request body validation.
 * 
 * @see {@link FestaQueryValidator}, {@link festaAPI} and its parameters {@link FestaAPI}.
 */
export type FestaBodyValidator<Config, Body> = {
    /**
     * The schema that the request body is expected to follow, to be returned in OPTIONS requests.
     * 
     * Can be `null` if the request body won't be validated.
     */
    schema: any,

    /**
     * Async function which validates the request body, ensuring it follows the {@link FestaBodyValidator.schema}.
     * 
     * Any thrown {@link Error} should be caught by the handler, and its {@link Error.message} returned by the API.
     * 
     * @param config - The current configuration of the request handler.
     * @param body - The deserialized contents of the request body.
     * @throws {ThrowableResponse}
     */
    perform: (params: { config: Config, body: any }) => Promise<Body>,
}


/**
 * {@link FestaBodyValidator} which ignores the body.
 * 
 * Never throws.
 */
export const festaNoBody: FestaBodyValidator<any, {}> = {
    schema: null,
    perform: async ({ }) => {
        return {}
    },
}


/**
 * Factory of {@link FestaBodyValidator}s using JSON Schema to perform the validation.
 * 
 * _TypeScript note: `schema` parameter validation has been turned off because it was pointlessly annoying.
 * 
 * @param {JSONSchemaType} schema - The {@link JSONSchemaType} to be used in validation.
 */
export function festaJsonSchemaBody<Body>(schema: any /* JSONSchemaType<Body> */): FestaBodyValidator<any, Body> {
    const ajv = new Ajv()
    const validate = ajv.compile(schema)

    return {
        schema,
        perform: async ({ body }) => {
            const valid = validate(body)

            if (!valid) {
                throw new Response({
                    status: 422,
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

            return body as Body
        }
    }
}
