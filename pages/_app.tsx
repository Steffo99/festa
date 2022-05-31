import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LoginContext } from '../contexts/login'
import { useState } from 'react'
import defaultPostcard from "../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { Postcard } from '../components/Postcard'
import { PostcardContext } from '../contexts/postcard'
import { StaticImageData } from 'next/image'
import { appWithTranslation } from 'next-i18next'
import { FestaLoginData } from '../types/user'
import {useStoredLogin} from "../hooks/useStoredLogin"
import { Fetcher, SWRConfig } from 'swr'
import axios, { AxiosRequestConfig } from 'axios'


const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const [postcard, setPostcard] = useState<string | StaticImageData>(defaultPostcard)

    const [login, setLogin] = useState<FestaLoginData | null>(null)
    useStoredLogin(setLogin)

    const axiosConfig = {
        headers: {
            "Authorization": login ? `Bearer ${login.token}` : "",
        }
    }
    
    const swrConfig = {
        fetcher: async (resource: string, localAxiosConfig: AxiosRequestConfig<any>) => {
            const response = await axios.get(resource, {...axiosConfig, ...localAxiosConfig})
            return response.data
        }
    }

    return (
        <PostcardContext.Provider value={[postcard, setPostcard]}>
        <LoginContext.Provider value={[login, setLogin]}>
        <SWRConfig value={swrConfig}>
            <Postcard/>
            <Component {...pageProps} />
        </SWRConfig>
        </LoginContext.Provider>
        </PostcardContext.Provider>
    )
}

export default appWithTranslation(App)
