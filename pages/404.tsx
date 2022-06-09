import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { default as Link } from "next/link";
import { ErrorBlock } from "../components/errors/ErrorBlock";
import { usePostcardImage } from "../components/postcard/usePostcardImage";
import { ViewNotice } from "../components/view/ViewNotice";
import errorPostcard from "../public/postcards/markus-spiske-iar-afB0QQw-unsplash-red.jpg"


export async function getStaticProps(context: NextPageContext) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


export default function Page404() {
    const { t } = useTranslation()

    usePostcardImage(`url(${errorPostcard.src})`)

    return <>
        <ViewNotice
            notice={<>
                <ErrorBlock
                    text={t("notFoundError")}
                    error={new Error("HTTP 404 (Not found)")}
                />
                <p>
                    <Link href="/"><a>← {t("notFoundBackHome")}</a></Link>
                </p>
            </>}
        />
    </>
}