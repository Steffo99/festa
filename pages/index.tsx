import type { NextPage, NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps(context: NextPageContext) {
    return {props: {
        ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
    }}
}

const Page: NextPage = () => {
    const {t} = useTranslation("common")

    return (
        <div>
            <h1>
                {t("title")}
            </h1>
            <p>
                {t("description")}
            </p>
        </div>
    )
}

export default Page
