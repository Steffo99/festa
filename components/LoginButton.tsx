import * as React from 'react';
import {LoginContext} from "../contexts/login"
import OriginalTelegramLoginButton from 'react-telegram-login'
import { useDefinedContext } from '../utils/definedContext';

export function LoginButton(props: any) {
    const [login, setLogin] = useDefinedContext(LoginContext)

    return (
        <div className="container-btn-telegram">
            <OriginalTelegramLoginButton
                dataOnauth={setLogin}
                usePic={false}
                {...props}
            />
        </div>
    )
}