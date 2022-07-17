import { OutgoingHttpHeaders } from "http2"
import { NextApiResponse } from "next"

/**
 * Object representing a HTTP response which can be `throw`n to interrupt the regular flow of the handling of a HTTP request. 
 */
export class Response {
    /**
     * The status code returned in the response.
     */
    status: number

    /**
     * The JSON-serializable data returned in the response.
     * 
     * If `undefined`, the response will not contain a body.
     */
    body?: any

    /**
     * Map of headers to add to the response.
     */
    headers: OutgoingHttpHeaders

    /**
     * Construct a new {@link Response} with the given parameters.
     * 
     * @constructor
     */
    constructor({ status, body = undefined, headers = {} }: { status: number, body?: any, headers?: OutgoingHttpHeaders }) {
        this.status = status
        this.body = body
        this.headers = headers
    }

    /**
     * Construct a new {@link Response} with a body of `{ error }`.
     */
    static error({ status = 500, message, headers = {} }: { status?: number, message: string, headers?: OutgoingHttpHeaders }) {
        return new this({
            status,
            body: { error: message },
            headers,
        })
    }

    /**
     * Create a new {@link Response} from a {@link Error} object.
     * 
     * @param error - The error to base the response on.
     * @param prodMessage - The message to display if the server is running in production mode and cannot display full error messages.
     */
    static fromClassError(error: Error, prodMessage: string = "Unexpected server error occurred") {
        return this.error({
            message: process.env.NODE_ENV === "development" ? error.message : prodMessage,
        })
    }

    /**
     * Create a new {@link Response} from any object.
     * 
     * To be used together with the `catch` keyword.
     * 
     * @param obj - The object to base the response on.
     * @param defaultMessage - The message to display if the server is running in production mode and cannot display full error messages or if the error message cannot be determined. 
     */
    static fromUnknownError(obj: unknown, defaultMessage: string = "Unexpected server error occurred") {
        if (process.env.NODE_ENV !== "development") {
            return this.error({ message: defaultMessage })
        }

        switch (typeof obj) {
            case "string":
                return this.error({ message: obj })
            case "object":
                if (obj) {
                    if (obj instanceof Error) {
                        return this.fromClassError(obj, defaultMessage)
                    }
                    if (Object.hasOwn(obj, "message") && typeof (obj as { message: any }).message === "string") {
                        const message = (obj as { message: string }).message
                        return this.error({ message })
                    }
                }
            default:
                return this.error({ message: defaultMessage })
        }
    }

    /**
     * Consume a {@link NextApiResponse} to send this request.
     * 
     * @param res - The res object to use.
     */
    consume(res: NextApiResponse): void {
        // Set headers
        for (const [hk, hv] of Object.entries(this.headers)) {
            if (hv === undefined) continue
            res.setHeader(hk, hv)
        }
        // Send status code and headers
        res.status(this.status)
        // Conclude the request
        if (this.body === undefined) {
            res.end()
        }
        else {
            res.json(this.body)
        }
    }

    /**
     * Wrap a function to convert all errors happening in it to {@link Response}s, using {@link Response.fromUnknownError}. 
     * 
     * @param f - The function to wrap.
     * @param defaultMessage - The message to display if the server is running in production mode and cannot display full error messages or if the error message cannot be determined. 
     * @returns The return value of `f`.
     * @throws If an error is thrown inside `f`, the result of {@link Response.fromUnknownError} being called on the error.
     */
    static convertThrownErrors<T>(f: () => T, defaultMessage: string): T {
        try {
            return f()
        }
        catch (e) {
            throw this.fromUnknownError(e, defaultMessage)
        }
    }

    /**
     * Wrap an async function to catch all instances of {@link Response} thrown in it, and make them {@link Response.consume|consume} the passed `res` to send them as a response to the user agent.
     * 
     * @param res - The res object to use.
     * @param f - The function to wrap.
     */
    static async handle(res: NextApiResponse, f: () => Promise<void>): Promise<void> {
        try {
            await f()
        }
        catch (e) {
            if (typeof e === "object" && e instanceof Response) {
                e.consume(res)
            }
            else {
                this.fromUnknownError(e).consume(res)
            }
        }
    }
}