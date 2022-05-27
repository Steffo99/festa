import { UserData } from "../utils/telegram";
import { TelegramAvatar } from "./TelegramAvatar";

interface TelegramUserLinkProps {
    u: UserData
}

export function TelegramUser({u}: TelegramUserLinkProps) {

    if(u.username) return (
        <a href={`https://t.me/${u.username}`}>
            <TelegramAvatar u={u}/>
            {u.username}
        </a>
    )
    else if(u.last_name) return (
        <span>
            <TelegramAvatar u={u}/>
            {u.first_name} {u.last_name}
        </span>
    )
    else return (
        <span>
            <TelegramAvatar u={u}/>
            {u.first_name}
        </span>
    )
}