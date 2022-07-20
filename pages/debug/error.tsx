import { NextPage, NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ErrorBlock, ErrorMain } from "../../components/generic/errors/renderers";
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


const PageDebugError: NextPage = (props) => {
    const { t } = useTranslation()

    return <>
        <Postcard
            src={debugPostcard}
        />
        <ViewNotice
            notice={<>
                <ErrorMain error={new Error("Example")} text={t("debugError")} />
            </>}
        />
    </>
}


export default PageDebugError
