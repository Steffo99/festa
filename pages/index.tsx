import type { NextPage, NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps(context: NextPageContext) {
    return {props: {
        ...(await serverSideTranslations(context.locale, ["common"]))
    }}
}

const Page: NextPage = () => {
    const {t} = useTranslation("common")

    return (
        <div className="index-layout">
            <h1 class="index-title">
                {t("title")}
            </h1>
            <h2>
                {t("description")}
            </h2>
        </div>
    )
}

export default Page
