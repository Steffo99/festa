import { UserData } from "../utils/telegram";

interface TelegramUserLinkProps {
    u: UserData
}

export function TelegramUserLink({u}: TelegramUserLinkProps) {

    if(u.username) return (
        <a href={`https://t.me/${u.username}`}>
            {u.username}
        </a>
    )
    else if(u.last_name) return (
        <span>
            {u.first_name} {u.last_name}
        </span>
    )
    else return (
        <span>
            u.first_name
        </span>
    )
}