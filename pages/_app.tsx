import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LoginContext } from '../contexts/login'
import { useEffect, useState } from 'react'
import defaultPostcard from "../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { Postcard } from '../components/Postcard'
import { PostcardContext } from '../contexts/postcard'
import { StaticImageData } from 'next/image'
import { appWithTranslation } from 'next-i18next'
import { FestaLoginData } from '../types/user'
import {useStoredLogin} from "../hooks/useStoredLogin"


const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const [login, setLogin] = useState<FestaLoginData | null>(null)
    const [postcard, setPostcard] = useState<string | StaticImageData>(defaultPostcard)
    useStoredLogin(setLogin)

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
