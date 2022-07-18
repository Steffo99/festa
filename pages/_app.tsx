import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AppProps } from 'next/app'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { AxiosSWRFetcherProvider } from '../components/auth/requests'
import { ErrorBoundaryPage } from '../components/generic/errors/boundaries'
import { AuthContextProvider } from '../components/auth/provider'
import { PostcardRenderer } from '../components/postcard/renderer'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import { PostcardContextProvider } from '../components/postcard/provider'
import defaultPostcard from "../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { LoadingBoundaryPage } from '../components/generic/loading/boundaries'


fontAwesomeConfig.autoAddCss = false


const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const { t } = useTranslation()

    return (
        <ErrorBoundaryPage text={t("genericError")}>
            <AxiosSWRFetcherProvider>
                <PostcardContextProvider defaultPostcard={defaultPostcard}>
                    <AuthContextProvider storageKey="auth">
                        <AxiosSWRFetcherProvider>
                            <PostcardRenderer />
                            <ErrorBoundaryPage text={t("genericError")}>
                                <LoadingBoundaryPage>
                                    <Component {...pageProps} />
                                </LoadingBoundaryPage>
                            </ErrorBoundaryPage>
                        </AxiosSWRFetcherProvider>
                    </AuthContextProvider>
                </PostcardContextProvider>
            </AxiosSWRFetcherProvider>
        </ErrorBoundaryPage>
    )
}

export default appWithTranslation(App)
