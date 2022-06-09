import { Event, User } from "@prisma/client";
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { default as Head } from "next/head";
import { ChangeEvent, useState } from "react";
import { ToolBar } from "../../components/tools/ToolBar";
import { EditableMarkdown } from "../../components/editable/EditableMarkdown";
import { EditableText } from "../../components/editable/EditableText";
import { ToolToggleEditing } from "../../components/tools/ToolToggleEditing";
import { EditingContext } from "../../components/editable/EditingContext";
import { database } from "../../utils/prismaClient";
import { EditableFilePicker } from "../../components/editable/EditableFilePicker";
import { ViewEvent } from "../../components/view/ViewEvent";
import { ToolToggleVisible } from "../../components/tools/ToolToggleVisible";
import { WorkInProgress } from "../../components/WorkInProgress";
import { usePostcardImage } from "../../components/postcard/usePostcardImage";
import defaultPostcard from "../../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"


export async function getServerSideProps(context: NextPageContext) {
    const slug = context.query.slug as string
    if (typeof slug === "object") {
        return { notFound: true }
    }

    const initialEvent = await database.event.findUnique({
        where: { slug },
        include: { creator: true }
    })
    if (!initialEvent) {
        return { notFound: true }
    }

    return {
        props: {
            initialEvent,
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


type PageEventDetailProps = {
    initialEvent: Event & { creator: User }
}


export default function PageEventDetail({ initialEvent }: PageEventDetailProps) {
    const { t } = useTranslation()
    const editState = useState<boolean>(false)
    const [event, setEvent] = useState<Event>(initialEvent)

    const displayedPostcard = event.postcard || defaultPostcard.src
    usePostcardImage(`url(${displayedPostcard})`)

    return <>
        <Head>
            <title key="title">{initialEvent.name} - {t("siteTitle")}</title>
        </Head>
        <WorkInProgress />
        <EditingContext.Provider value={editState}>
            <ToolBar vertical="vadapt" horizontal="right">
                <ToolToggleEditing />
                <ToolToggleVisible />
            </ToolBar>
            <ViewEvent
                title={
                    <EditableText
                        value={event.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEvent({ ...event, name: e.target.value })}
                        placeholder={t("eventDetailsNamePlaceholder")}
                    />
                }
                postcard={
                    <EditableFilePicker
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEvent({ ...event, postcard: URL.createObjectURL(e.target.files![0]) })}
                        placeholder={t("eventDetailsPostcardPlaceholder")}
                    />
                }
                description={
                    <EditableMarkdown
                        value={event.description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEvent({ ...event, description: e.target.value })}
                        placeholder={t("eventDetailsDescriptionPlaceholder")}
                    />
                }
                daterange={<></>}
            />
        </EditingContext.Provider>
    </>
}