import { NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LoginContext } from '../contexts/login'
import { useDefinedContext } from '../utils/definedContext'
import { ActionLoginTelegram } from '../components/ActionLoginTelegram'
import { ActionEventList } from '../components/ActionEventList'
import {default as Head} from 'next/head'
import defaultPostcard from "../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { Postcard } from '../components/postcard/Postcard'
import { ViewLanding } from '../components/view/ViewLanding'


export async function getStaticProps(context: NextPageContext) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


export default function PageIndex() {
    const { t } = useTranslation()
    const [login, ] = useDefinedContext(LoginContext)

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
            actions={
                (login ?
                    <ActionEventList
                        className="hero-action"
                    />
                :
                    <ActionLoginTelegram
                        className="hero-action"
                    />
                )
            }
        />
    </>
}
