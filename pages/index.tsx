import { NextPage, NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { default as Head } from 'next/head'
import defaultPostcard from "../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { Postcard } from '../components/postcard/changer'
import { ViewLanding } from '../components/generic/views/landing'
import { LandingActionLogin } from '../components/landing/actions/login'
import { useDefinedContext } from '../utils/definedContext'
import { AuthContext } from '../components/auth/base'
import { LandingActionEvents } from '../components/landing/actions/events'


export async function getStaticProps(context: NextPageContext) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


const PageIndex: NextPage = () => {
    const { t } = useTranslation()
    const [auth,] = useDefinedContext(AuthContext)

    return <>
        <Head>
            <title key="title">{t("siteTitle")}</title>
        </Head>
        <Postcard
            src={defaultPostcard}
        />
        <ViewLanding
            title={t("siteTitle")}
            subtitle={t("siteSubtitle")}
            actions={auth ?
                <LandingActionEvents />
                :
                <LandingActionLogin />
            }
        />
    </>
}


export default PageIndex
