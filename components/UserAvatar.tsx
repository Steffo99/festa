import { LoginContext } from "../contexts/login";
import { useDefinedContext } from "../hooks/useDefinedContext";

export function UserAvatar() {
    const [login, _] = useDefinedContext(LoginContext)

    return login ?
        <img
            src={login?.photo_url}
            className="avatar-telegram"
        />
    :
        null
}