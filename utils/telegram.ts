import nodecrypto from "crypto"

/**
 * The validated user data serialized by the server.
 */
export interface LoginData {
    id: number
    first_name: string
    last_name: string | null
    username: string | null
    photo_url: string | null
    lang: string | null
}


/**
 * The response sent by Telegram after a login.
 */
export class LoginResponse {
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
    constructor(queryObj: {[_: string]: string | string[]}) {
        if(typeof queryObj.id === "object") {
            throw new Error("Multiple `id` parameters specified in the query string, cannot construct LoginResponse.")
        }
        if(typeof queryObj.first_name === "object") {
            throw new Error("Multiple `first_name` parameters specified in the query string, cannot construct LoginResponse.")
        }
        if(typeof queryObj.last_name === "object") {
            throw new Error("Multiple `last_name` parameters specified in the query string, cannot construct LoginResponse.")
        }
        if(typeof queryObj.username === "object") {
            throw new Error("Multiple `username` parameters specified in the query string, cannot construct LoginResponse.")
        }
        if(typeof queryObj.photo_url === "object") {
            throw new Error("Multiple `photo_url` parameters specified in the query string, cannot construct LoginResponse.")
        }
        if(typeof queryObj.auth_date === "object") {
            throw new Error("Multiple `auth_date` parameters specified in the query string, cannot construct LoginResponse.")
        }
        if(typeof queryObj.hash === "object") {
            throw new Error("Multiple `hash` parameters specified in the query string, cannot construct LoginResponse.")
        }
        if(typeof queryObj.lang === "object") {
            throw new Error("Multiple `hash` parameters specified in the query string, cannot construct LoginResponse.")
        }

        this.id = parseInt(queryObj.id)
        this.first_name = queryObj.first_name
        this.last_name = queryObj.last_name
        this.username = queryObj.username
        this.photo_url = queryObj.photo_url
        this.auth_date = parseInt(queryObj.auth_date)
        this.hash = queryObj.hash
        this.lang = queryObj.lang
    }

    /**
     * Serialize this response into a {@link LoginData} object, which can be passed to the client by Next.js.
     * 
     * @returns The {@link LoginData} object.
     */
    serialize(): LoginData {
        return {
            id: this.id ?? null,
            first_name: this.first_name ?? null,
            last_name: this.last_name ?? null,
            username: this.username ?? null,
            photo_url: this.photo_url ?? null,
            lang: this.lang ?? null,
        }
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
     * @param maxSeconds The maximum number of milliseconds that may pass after authentication for the response to be considered valid; defaults to `300000`, 5 minutes.
     * @returns `true` if the response can be considered recent, `false` otherwise.
     */
    isRecent(maxSeconds: number = 300000): boolean {
        const diff = new Date().getTime() - new Date(this.auth_date * 1000).getTime()
        return 0 < diff && diff <= maxSeconds
    }


    /**
     * Calculate the "`hash`" of a Telegram Login using [this procedure](https://core.telegram.org/widgets/login#checking-authorization).
     * 
     * @param token The bot token used to validate the signature.
     * @returns The calculated value of the `hash` {@link LoginResponse} parameter.
     */
    hmac(token: string): string {
        const key = hashToken(token)
        const hmac = nodecrypto.createHmac("sha256", key)
        hmac.update(this.stringify())
        return hmac.digest("hex")
    }

    /**
     * Validate a Telegram Login using [this procedure](https://core.telegram.org/widgets/login#checking-authorization).
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

/**
 * Hash a Telegram bot token using SHA-256.
 * 
 * @param token The bot token to hash.
 * @returns The hex digest of the hash.
 */
function hashToken(token: string): Buffer {
    const hash = nodecrypto.createHash("sha256")
    hash.update(token)
    return hash.digest()
}
