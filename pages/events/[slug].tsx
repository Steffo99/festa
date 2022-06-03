import { Event } from "@prisma/client";
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ErrorInline } from "../../components/ErrorInline";
import { Loading } from "../../components/Loading";
import {useEventDetail} from "../../hooks/useEventDetail"
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

    return (
        <main id="page-event-detail" className="page">
            <h1>
                {event.name}
            </h1>
        </main>
    )
}