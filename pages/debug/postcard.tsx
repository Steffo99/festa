import { NextPage, NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { StaticImageData } from "next/image";
import { useState } from "react";
import { ToolBar } from "../../components/generic/toolbar/bar";
import { ViewNotice } from "../../components/generic/views/notice";
import { PostcardSource } from "../../components/postcard/base";
import { Postcard } from "../../components/postcard/changer";
import { ToolToggleVisibility } from "../../components/postcard/toolbar/toolToggleVisibility";
import debugPostcard from "../../public/postcards/markus-spiske-iar-afB0QQw-unsplash.jpg"


export async function getStaticProps(context: NextPageContext) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


// All images from https://www.reddit.com/r/hmmm/
const possiblePostcards: (PostcardSource | StaticImageData)[] = [
    "https://i.imgur.com/tpC5y1N.png",
    "https://i.imgur.com/sKdbsC5.jpg",
    "https://i.redd.it/nx2usi3gssf21.jpg",
    "https://i.redd.it/oy0ve07w6wgz.jpg",
    "https://i.redd.it/b3do0thb66581.jpg",
    "https://i.redd.it/w5ed0yk2s9l21.png",
    "https://i.redd.it/pqnbvrc8och41.jpg",
    "https://i.redd.it/x3dqd57hdyx31.jpg",
    "https://i.redd.it/zo46srrm7xe21.png",
]


const PageDebugPostcard: NextPage = (props) => {
    const { t } = useTranslation()
    const [postcard, setPostcard] = useState<PostcardSource | StaticImageData>(debugPostcard)

    return <>
        <Postcard
            src={postcard}
        />
        <ToolBar
            vertical="vadapt"
            horizontal="right"
        >
            <ToolToggleVisibility />
        </ToolBar>
        <ViewNotice
            notice={<>
                <p>
                    {t("debugPostcardText")}
                </p>
                <button onClick={() => {
                    setPostcard(possiblePostcards[~~(Math.random() * possiblePostcards.length)])
                }}>
                    {t("debugPostcardButton")}
                </button>
            </>}
        />
    </>
}


export default PageDebugPostcard
