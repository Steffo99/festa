import { default as TelegramLoginButton, TelegramLoginResponse } from "react-telegram-login"
import { default as nodecrypto } from "crypto"
import { AccountTelegram } from "@prisma/client"


/**
 * A {@link TelegramLoginResponse} object extended with various utility methods, and with its fields renamed to follow the camelCase JS convention.
 */
export class TelegramLoginObject {
    id: number
    firstName: string
    lastName?: string
    username?: string
    photoUrl?: string
    lang?: string
    authDate: Date
    hash: string

    /**
     * Construct a {@link TelegramLoginObject} object from a {@link TelegramLoginData}.
     * 
     * @param u The {@link TelegramLoginData} to use. 
     */
    constructor(u: TelegramLoginResponse) {
        if (!u.id) throw new Error("Missing `id`")
        if (!u.first_name) throw new Error("Missing `first_name`")
        if (!u.auth_date) throw new Error("Missing `auth_date`")
        if (!u.hash) throw new Error("Missing `hash`")

        this.id = u.id
        this.firstName = u.first_name
        this.lastName = u.last_name
        this.username = u.username
        this.photoUrl = u.photo_url
        this.authDate = new Date(u.auth_date * 1000)

        // https://stackoverflow.com/a/12372720/4334568
        if (isNaN(this.authDate.getTime())) throw new Error("Invalid `auth_date`")

        this.hash = u.hash
        this.lang = u.lang
    }

    /**
     * Convert this object back into a {@link TelegramLoginResponse}.
     * 
     * @return The {@link TelegramLoginResponse} object, ready to be serialized.
     */
    toObject(): TelegramLoginResponse {
        return {
            id: this.id,
            first_name: this.firstName,
            last_name: this.lastName,
            username: this.username,
            photo_url: this.photoUrl,
            lang: this.lang,
            auth_date: this.authDate.getTime() / 1000,
            hash: this.hash,
        }
    }

    /**
     * Convert this object into a partial {@link AccountTelegram} database object.
     */
    toDatabase(): Pick<AccountTelegram, "telegramId" | "firstName" | "lastName" | "username" | "photoUrl" | "lang"> {
        return {
            telegramId: this.id,
            firstName: this.firstName,
            lastName: this.lastName ?? null,
            username: this.username ?? null,
            photoUrl: this.photoUrl ?? null,
            lang: this.lang ?? null,
        }
    }

    /**
     * Convert this object in a string, using [the format required to verify a Telegram Login](https://core.telegram.org/widgets/login#checking-authorization).
     * 
     * @param data The data to encode.
     * @returns The stringified data.
     */
    toString(): string {
        const string = Object.entries(this.toObject())
            .filter(([key, _]) => key !== "hash")
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => `${key}=${value}`)
            .sort()
            .join("\n")
        return string
    }

    /**
     * Check if the `authDate` of the response is recent: it must be in the past, but within `maxMs` from the current date.
     * 
     * @param maxMs The maximum number of milliseconds that may pass after authentication for the response to be considered valid.
     * @returns `true` if the request was sent within the requested timeframe, `false` otherwise.
     */
    isRecent(maxMs: number): boolean {
        const diff = new Date().getTime() - this.authDate.getTime()
        return diff <= maxMs
    }

    /**
     * Calculate the "`hash`" of this object using [the Telegram Login verification procedure](https://core.telegram.org/widgets/login#checking-authorization).
     * 
     * _Only works on Node.js, due to usage of the `crypto` module._
     * 
     * @param token The bot token used to validate the signature.
     * @returns The calculated value of the `hash` parameter.
     */
    hmac(token: string): string {
        const hash = nodecrypto.createHash("sha256")
        hash.update(token)
        const hmac = nodecrypto.createHmac("sha256", hash.digest())
        hmac.update(this.toString())
        return hmac.digest("hex")
    }

    /**
     * Validate this object using [the Telegram Login verification procedure](https://core.telegram.org/widgets/login#checking-authorization).
     * 
     * _Only works on Node.js, due to usage of the `crypto` module._
     * 
     * @param token The bot token used to validate the signature.
     * @returns `true` if the hash matches the value calculated with {@link hmac}, `false` otherwise.
     */
    isValid(token: string): boolean {
        const received = this.hash
        const calculated = this.hmac(token)
        return received === calculated
    }

    /**
     * Get the Telegram "displayed name" of the user represented by this object.
     */
    toTelegramName(): string {
        if (this.username) return this.username
        else if (this.lastName) return this.firstName + " " + this.lastName
        else return this.firstName
    }
}
