import { NextPage, NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ErrorBlock } from "../components/generic/errors/renderers";
import { ViewNotice } from "../components/generic/views/notice";
import { Postcard } from "../components/postcard/changer";
import errorPostcard from "../public/postcards/markus-spiske-iar-afB0QQw-unsplash-red.jpg"


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
            src={errorPostcard}
        />
        <ViewNotice
            notice={<>
                <ErrorBlock
                    text={t("internalServerError")}
                    error={new Error("HTTP 500 (Internal server error)")}
                />
            </>}
        />
    </>
}


export default Page500
