import type { NextPage, NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Intro } from '../components/Intro';
import { LoginButton } from '../components/LoginButton';

export async function getStaticProps(context: NextPageContext) {
    return {props: {
        ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
    }}
}

const Page: NextPage = () => {
    const {t} = useTranslation("common")

    return (
        <div className="index">
            <hgroup>
                <h1>
                    {t("siteTitle")}
                </h1>
                <h2>
                    {t("siteSubtitle")}
                </h2>
            </hgroup>
            <div>
                <Intro/>
            </div>
        </div>
    )
}

export default Page
