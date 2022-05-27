import { LoginContext } from "../contexts/login";
import { useDefinedContext } from "../utils/definedContext";
import { UserData } from "../utils/telegram";


export interface TelegramAvatarProps {
    u: UserData
}


export function TelegramAvatar({u}: TelegramAvatarProps) {
    const [login, _] = useDefinedContext(LoginContext)

    return login ?
        <img
            src={u.photo_url}
            className="avatar-telegram-inline"
        />
    :
        null
}