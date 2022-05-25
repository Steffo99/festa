import '../styles/globals.css'
import '../styles/telegram.css'
import '../styles/postcard.css'
import "../styles/index.css"
import type { AppProps } from 'next/app'
import { LoginContext } from '../contexts/login'
import { useState } from 'react'
import * as Telegram from "../utils/telegram"
import defaultPostcard from "../images/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { Postcard } from '../components/Postcard'
import { PostcardContext } from '../contexts/postcard'
import { StaticImageData } from 'next/image'
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const loginHook = useState<Telegram.LoginData | null>(null)
    const postcardHook = useState<string | StaticImageData>(defaultPostcard)

    return (
        <PostcardContext.Provider value={postcardHook}>
        <LoginContext.Provider value={loginHook}>
            <Postcard/>
            <Component {...pageProps} />
        </LoginContext.Provider>
        </PostcardContext.Provider>
    )
}

export default appWithTranslation(App)
