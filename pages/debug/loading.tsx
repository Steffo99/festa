import { NextPage, NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ErrorBlock } from "../../components/generic/errors/renderers";
import { LoadingMain } from "../../components/generic/loading/renderers";
import { ViewNotice } from "../../components/generic/views/notice";
import { Postcard } from "../../components/postcard/changer";
import debugPostcard from "../../public/postcards/markus-spiske-iar-afB0QQw-unsplash.jpg"


export async function getStaticProps(context: NextPageContext) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


const Page500: NextPage = (props) => {
    const { t } = useTranslation()

    return <>
        <Postcard
            src={debugPostcard}
        />
        <ViewNotice
            notice={<>
                <LoadingMain text={t("debugLoading")} />
            </>}
        />
    </>
}


export default Page500
