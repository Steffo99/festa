import "./react-telegram-login.d.ts"
import { default as OriginalTelegramLoginButton, TelegramLoginButtonProps } from "react-telegram-login"
import style from "./loginButton.module.css"
import { memo, useCallback } from "react"


/**
 * Wrapper for {@link OriginalTelegramLoginButton}, configuring it for React.
 */
export const TelegramLoginButton = memo((props: TelegramLoginButtonProps) => {
    return (
        <div className={style.telegramLoginButtonContainer}>
            <OriginalTelegramLoginButton
                usePic={false}
                {...props}
            />
        </div>
    )
})
