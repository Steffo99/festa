import { NextPage, NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { default as Link } from "next/link";
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


const Page404: NextPage = (props) => {
    const { t } = useTranslation()

    return <>
        <Postcard
            src={errorPostcard}
        />
        <ViewNotice
            notice={<>
                <ErrorBlock
                    text={t("notFoundError")}
                    error={new Error("HTTP 404 (Not found)")}
                />
                <p>
                    <Link href="/"><a>
                        ← {t("notFoundBackHome")}
                    </a></Link>
                </p>
            </>}
        />
    </>
}

export default Page404
