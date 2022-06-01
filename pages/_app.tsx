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
import { SWRConfig } from 'swr'
import { AxiosRequestConfig } from 'axios'
import { useAxios } from '../hooks/useAxios'


const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const [postcard, setPostcard] = useState<string | StaticImageData>(defaultPostcard)
    const [login, setLogin] = useState<FestaLoginData | null>(null)
    useStoredLogin(setLogin)

    const axios = useAxios(login)
    
    const swrConfig = {
        fetcher: async (resource: string, init: AxiosRequestConfig<any>) => {
            const response = await axios.get(resource, init)
            // To test loading uncomment the following line:
            // await new Promise(res => setTimeout(res, 100000))
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
