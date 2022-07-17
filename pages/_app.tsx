import { AppProps } from 'next/app'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { AxiosSWRFetcherProvider } from '../components/auth/requests'
import { useStatePostcard } from '../components/postcard/storage'
import { PageErrorBoundary } from '../components/generic/errors/boundaries'
import { PostcardContext } from '../components/postcard/base'
import { AuthContext } from '../components/auth/base'
import { PostcardRenderer } from '../components/postcard/renderer'
import '../styles/globals.css'
import defaultPostcard from "../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useLocalStorageAuthState } from '../components/auth/storage'


fontAwesomeConfig.autoAddCss = false


const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const { t } = useTranslation()
    const postcardState = useStatePostcard(defaultPostcard)
    const authState = useLocalStorageAuthState("auth")

    return (
        <PageErrorBoundary text={t("genericError")}>
            <AxiosSWRFetcherProvider>
                <PostcardContext.Provider value={postcardState}>
                    <AuthContext.Provider value={authState}>
                        <AxiosSWRFetcherProvider>
                            <PostcardRenderer />
                            <Component {...pageProps} />
                        </AxiosSWRFetcherProvider>
                    </AuthContext.Provider>
                </PostcardContext.Provider>
            </AxiosSWRFetcherProvider>
        </PageErrorBoundary>
    )
}

export default appWithTranslation(App)
