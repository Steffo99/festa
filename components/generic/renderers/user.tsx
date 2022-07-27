import { User } from "@prisma/client"
import { default as useSWR } from "swr"
import { FestaIcon } from "./fontawesome"
import style from "./user.module.css"
import mood from "../../../styles/mood.module.css"
import cursor from "../../../styles/cursor.module.css"
import classNames from "classnames"
import { faAsterisk, faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { AxiosError } from "axios"


export type FestaUserRendererProps = {
    userId: User["id"],
    fallbackData?: User
}


export const FestaUserRenderer = ({ userId, fallbackData }: FestaUserRendererProps) => {
    const { data, error } = useSWR<User, AxiosError>(`/api/users/${userId}`, { fallbackData, revalidateOnFocus: false, revalidateOnReconnect: false, revalidateOnMount: fallbackData === undefined })

    if (error) {
        return (
            <span className={classNames(style.festaUserRenderer, mood.negative, cursor.hoverable)} title={error.response ? error.response.data : error}>
                <FestaIcon icon={faExclamationCircle} />
                {userId}
            </span>
        )
    }
    if (!data) {
        return (
            <span className={classNames(style.festaUserRenderer, cursor.loadingAsync)}>
                <FestaIcon icon={faAsterisk} spin />
                {userId}
            </span>
        )
    }

    const avatarURL = data!.displayAvatarURL
    const avatar = avatarURL ?
        <img className={style.festaUserRendererAvatar} src={avatarURL} /> :
        <div className={style.festaUserRendererAvatar} />

    const name = <span title={userId}>{data?.displayName}</span>

    return (
        <span className={style.festaUserRenderer}>
            {avatar}
            {name}
        </span>
    )
}