import { Event } from "@prisma/client";
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { PostcardContext } from "../../contexts/postcard";
import { useDefinedContext } from "../../utils/definedContext";
import { database } from "../../utils/prismaClient";


export async function getServerSideProps(context: NextPageContext) {
    const slug = context.query.slug as string
    if(typeof slug === "object") {
        return {notFound: true}
    }

    const event = await database.event.findUnique({where: {slug}})
    if(!event) {
        return {notFound: true}
    }

    return {
        props: {
            event,
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


type PageEventDetailProps = {
    event: Event
}


export default function PageEventDetail({event}: PageEventDetailProps) {
    const {t} = useTranslation()
    const [_, setPostcard] = useDefinedContext(PostcardContext)

    useEffect(
        () => {
            console.debug(event.postcard)
            if(event.postcard) {
                setPostcard(event.postcard)
            }
        },
        [event]
    )

    return (
        <main id="page-event-detail" className="page">
            <h1>
                {event.name}
            </h1>
        </main>
    )
}