declare module "react-telegram-login" {
    /**
     * Serializable Telegram login data including technical information, exactly as returned by Telegram Login.
     */
    export type TelegramLoginResponse = {
        id: number
        first_name: string
        last_name?: string
        username?: string
        photo_url?: string
        lang?: string
        auth_date: number
        hash: string
    }

    type TelegramLoginButtonPropsOnAuth = {
        dataOnauth: (data: TelegramLoginResponse) => void,
    }

    type TelegramLoginButtonPropsAuthUrl = {
        dataAuthUrl: string,
    }

    export type TelegramLoginButtonProps = (TelegramLoginButtonPropsOnAuth | TelegramLoginButtonPropsAuthUrl) & {
        botName: string,
        buttonSize: "small" | "medium" | "large",
        cornerRadius?: number,
        requestAccess: undefined | "write",
        usePic?: boolean,
        lang?: string,
        widgetVersion?: number,
    }

    export default TelegramLoginButton = (props: TelegramLoginButtonProps) => JSX.Element
};