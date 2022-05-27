import '../styles/globals.css'
import '../styles/telegram.css'
import '../styles/postcard.css'
import "../styles/index.css"
import type { AppProps } from 'next/app'
import { LoginContext } from '../contexts/login'
import { useEffect, useState } from 'react'
import * as Telegram from "../utils/telegram"
import defaultPostcard from "../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { Postcard } from '../components/Postcard'
import { PostcardContext } from '../contexts/postcard'
import { StaticImageData } from 'next/image'
import { appWithTranslation } from 'next-i18next'
import { useStorageState } from 'react-storage-hooks'

const dummyStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
};

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const [login, setLogin] = useState<Telegram.LoginData | null>(null)
    const [postcard, setPostcard] = useState<string | StaticImageData>(defaultPostcard)

    // Ha ha ha. Fooled you again, silly SSR!
    const thatStorageOverThere = typeof sessionStorage !== "undefined" ? sessionStorage : undefined

    useEffect(
        () => {
            if(thatStorageOverThere === undefined) return

            const raw = sessionStorage.getItem("login")
            if(raw === null) return

            const parsed = JSON.parse(raw) as Telegram.LoginData
            const response = new Telegram.LoginResponse(parsed)
            if(!response.isRecent) return

            setLogin(parsed)
        },
        [thatStorageOverThere]
    )

    return (
        <PostcardContext.Provider value={[postcard, setPostcard]}>
        <LoginContext.Provider value={[login, setLogin]}>
            <Postcard/>
            <Component {...pageProps} />
        </LoginContext.Provider>
        </PostcardContext.Provider>
    )
}

export default appWithTranslation(App)
