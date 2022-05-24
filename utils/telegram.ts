import nodecrypto from "crypto"
import { ParsedUrlQuery } from "querystring"
import * as QueryString from "./querystring"

/**
 * Serializable Telegram user data without any technical information.
 */
export interface UserData {
    id: number
    first_name: string
    last_name?: string
    username?: string
    photo_url?: string
    lang?: string
}

/**
 * Serializable Telegram login data with technical information.
 * 
 * Can be turned in a {@link LoginResponse} for additional methods.
 */
export interface LoginData extends UserData {
    auth_date: number
    hash: string
}


/**
 * Create a {@link LoginData} object from a {@link ParsedUrlQuery}.
 * 
 * @param queryObj The source object.
 * @returns The created object.
 */
export function queryStringToLoginData(queryObj: ParsedUrlQuery): LoginData {
    return {
        id: parseInt(QueryString.getSingle(queryObj, "id")),
        first_name: QueryString.getSingle(queryObj, "first_name"),
        last_name: QueryString.getSingle(queryObj, "last_name"),
        username: QueryString.getSingle(queryObj, "username"),
        photo_url: QueryString.getSingle(queryObj, "photo_url"),
        lang: QueryString.getSingle(queryObj, "lang"),
        auth_date: parseInt(QueryString.getSingle(queryObj, "auth_date")),
        hash: QueryString.getSingle(queryObj, "hash"),
    }
}


/**
 * The response sent by Telegram after a login.
 */
export class LoginResponse implements LoginData {
    id: number
    first_name: string
    last_name?: string
    username?: string
    photo_url?: string
    auth_date: number
    hash: string
    lang?: string

    /**
     * Construct a new {@link LoginResponse} from a query string object as returned by Next.js.
     * 
     * @param queryObj The query string object, from `context.query`.
     */
    constructor(ld: LoginData) {
        this.id = ld.id
        this.first_name = ld.first_name
        this.last_name = ld.last_name
        this.username = ld.username
        this.photo_url = ld.photo_url
        this.auth_date = ld.auth_date
        this.hash = ld.hash
        this.lang = ld.lang
    }

    /**
     * Stringify a {@link LoginResponse} in [the format required to verify a Telegram Login](https://core.telegram.org/widgets/login#checking-authorization).
     * 
     * @param data The data to encode.
     * @returns The stringified data.
     */
    stringify(): string {
        const string = Object.entries(this)
            .filter(([key, _]) => key !== "hash")
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => `${key}=${value}`)
            .sort()
            .join("\n")
        return string
    }

    /**
     * Check if the `auth_date` of the response is recent: it must be in the past, but within `maxSeconds` from the current date.
     * 
     * @param maxSeconds The maximum number of milliseconds that may pass after authentication for the response to be considered valid; defaults to `864_000_000`, 1 day.
     * @returns `true` if the response can be considered recent, `false` otherwise.
     */
    isRecent(maxSeconds: number = 864_000_000): boolean {
        const diff = new Date().getTime() - new Date(this.auth_date * 1000).getTime()
        return 0 < diff && diff <= maxSeconds
    }

    /**
     * Calculate the "`hash`" of a Telegram Login using [this procedure](https://core.telegram.org/widgets/login#checking-authorization).
     * 
     * _Only works on Node.js, due to usage of the `crypto` module._
     * 
     * @param token The bot token used to validate the signature.
     * @returns The calculated value of the `hash` {@link LoginResponse} parameter.
     */
    hmac(token: string): string {        
        const hash = nodecrypto.createHash("sha256")
        hash.update(token)
        const hmac = nodecrypto.createHmac("sha256", hash.digest())
        hmac.update(this.stringify())
        return hmac.digest("hex")
    }

    /**
     * Validate a Telegram Login using [this procedure](https://core.telegram.org/widgets/login#checking-authorization).
     * 
     * _Only works on Node.js, due to usage of the `crypto` module._
     * 
     * @param token The bot token used to validate the signature.
     * @returns `true` if the validation is successful, `false` otherwise.
     */
    isValid(token: string): boolean {
        const client = this.hmac(token)
        const server = this.hash
        return client === server
    }
}
