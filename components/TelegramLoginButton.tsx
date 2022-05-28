import * as React from 'react';
import { default as OriginalTelegramLoginButton } from 'react-telegram-login'


export function TelegramLoginButton(props: any) {
    return (
        <div className="container-btn-telegram">
            <OriginalTelegramLoginButton
                usePic={false}
                {...props}
            />
        </div>
    )
}