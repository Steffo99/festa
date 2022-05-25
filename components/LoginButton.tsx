import * as React from 'react';
import {LoginContext} from "../contexts/login"
import OriginalTelegramLoginButton from 'react-telegram-login'
import { useDefinedContext } from '../hooks/useDefinedContext';

export function LoginButton(props: any) {
    const [login, setLogin] = useDefinedContext(LoginContext)

    return React.useMemo(() => (
        login ? 
            <button onClick={() => setLogin(null)} className="btn-telegram">
                Log out
            </button>
        :
            <div className="container-btn-telegram">
                <OriginalTelegramLoginButton
                    dataOnauth={setLogin}
                    usePic={false}
                    {...props}
                />
            </div>
        ),
        [login]
    )
}