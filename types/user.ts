import { Token, User } from "@prisma/client"

/**
 * Serializable Telegram login data with technical information.
 */
export type TelegramLoginData = {
    id: number
    first_name: string
    last_name?: string
    username?: string
    photo_url?: string
    lang?: string
    auth_date: number
    hash: string
}

/**
 * Login data for a specific Festa user.
 */
export type FestaLoginData = Token & {user: User}
