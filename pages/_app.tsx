import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AppProps } from 'next/app'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { AxiosSWRFetcherProvider } from '../components/auth/requests'
import { PageErrorBoundary } from '../components/generic/errors/boundaries'
import { AuthContextProvider } from '../components/auth/provider'
import { PostcardRenderer } from '../components/postcard/renderer'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import { PostcardContextProvider } from '../components/postcard/provider'
import defaultPostcard from "../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"


fontAwesomeConfig.autoAddCss = false


const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const { t } = useTranslation()

    return (
        <PageErrorBoundary text={t("genericError")}>
            <AxiosSWRFetcherProvider>
                <PostcardContextProvider defaultPostcard={defaultPostcard}>
                    <AuthContextProvider storageKey="auth">
                        <AxiosSWRFetcherProvider>
                            <PostcardRenderer />
                            <Component {...pageProps} />
                        </AxiosSWRFetcherProvider>
                    </AuthContextProvider>
                </PostcardContextProvider>
            </AxiosSWRFetcherProvider>
        </PageErrorBoundary>
    )
}

export default appWithTranslation(App)
