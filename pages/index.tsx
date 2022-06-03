import { NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LoginContext } from '../contexts/login';
import { useDefinedContext } from '../utils/definedContext';
import { ActionLoginTelegram } from '../components/ActionLoginTelegram';
import { ActionEventList } from '../components/ActionEventList';
import { PostcardContext } from '../contexts/postcard';
import defaultPostcard from "../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { useEffect } from 'react';


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
    const [, setPostcard] = useDefinedContext(PostcardContext)

    useEffect(
        () => {
            setPostcard(defaultPostcard)
        },
        []
    )

    return (
        <main id="page-index" className="page">
            <hgroup className="hero-titles">
                <h1>
                    {t("siteTitle")}
                </h1>
                <h2>
                    {t("siteSubtitle")}
                </h2>
            </hgroup>
            {login ?
                <ActionEventList
                    className="hero-action"
                />
            :
                <ActionLoginTelegram
                    className="hero-action"
                />
            }
        </main>
    )
}
