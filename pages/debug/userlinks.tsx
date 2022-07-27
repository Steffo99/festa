import { NextPage, NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FestaUserRenderer } from "../../components/generic/renderers/user";
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


const PageDebugUserLinks: NextPage = (props) => {
    const { t } = useTranslation()

    return <>
        <Postcard
            src={debugPostcard}
        />
        <ViewNotice
            notice={<>
                <FestaUserRenderer
                    userId="4cf96e81-dae9-42fd-b620-e1409cd7e80a"
                    fallbackData={{
                        id: "4cf96e81-dae9-42fd-b620-e1409cd7e80a",
                        powerLevel: "USER",
                        displayName: "Steffo",
                        displayAvatarURL: "https://t.me/i/userpic/320/dBkGb8oy3GF830DOgqspuyfJh9B3z0zeU9oHT10kPOI.jpg",
                    }}
                />
                <FestaUserRenderer
                    userId="682a2a63-acbf-4bbb-8ab8-c38a33a0d380"
                />
                <FestaUserRenderer
                    userId="aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
                />
            </>}
        />
    </>
}


export default PageDebugUserLinks
