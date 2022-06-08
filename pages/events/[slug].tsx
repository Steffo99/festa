import { Event, User } from "@prisma/client";
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { default as Head } from "next/head";
import { ChangeEvent, useCallback, useState } from "react";
import { ToolBar } from "../../components/tools/ToolBar";
import { EditableMarkdown } from "../../components/editable/EditableMarkdown";
import { EditableText } from "../../components/editable/EditableText";
import { ToolToggleEditing } from "../../components/tools/ToolToggleEditing";
import { EditingContext } from "../../components/editable/EditingContext";
import { database } from "../../utils/prismaClient";
import { EditableFile } from "../../components/editable/EditableFile";
import { ViewEvent } from "../../components/view/ViewEvent";
import { ToolToggleVisible } from "../../components/tools/ToolToggleVisible";
import { EditableDateRange } from "../../components/editable/EditableDateRange";
import { WorkInProgress } from "../../components/WorkInProgress";
import { FormDateRange } from "../../components/form/FormDateRange";
import { Postcard } from "../../components/postcard/Postcard";
import { useFileState } from "../../hooks/useFileState";


export async function getServerSideProps(context: NextPageContext) {
    const slug = context.query.slug as string
    if (typeof slug === "object") {
        return { notFound: true }
    }

    const event = await database.event.findUnique({
        where: { slug },
        include: { creator: true }
    })
    if (!event) {
        return { notFound: true }
    }

    return {
        props: {
            event,
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


type PageEventDetailProps = {
    event: Event & { creator: User }
}


export default function PageEventDetail({ event }: PageEventDetailProps) {
    const { t } = useTranslation()
    const editState = useState<boolean>(false)
    const [title, setTitle] = useState<string>(event.name)
    const [description, setDescription] = useState<string>(event.description)
    const postcard = useFileState()
    const [startingAt, setStartingAt] = useState<string>(event.startingAt?.toISOString() ?? "")
    const [endingAt, setEndingAt] = useState<string>(event.endingAt?.toISOString() ?? "")

    return <>
        <Head>
            <title key="title">{event.name} - {t("siteTitle")}</title>
        </Head>
        <WorkInProgress />
        <Postcard src={postcard.file ? URL.createObjectURL(postcard.file) : event.postcard ?? undefined} />
        <EditingContext.Provider value={editState}>
            <ToolBar vertical="vadapt" horizontal="right">
                <ToolToggleEditing />
                <ToolToggleVisible />
            </ToolBar>
            <ViewEvent
                title={
                    <EditableText
                        value={title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        placeholder={t("eventDetailsTitlePlaceholder")}
                    />
                }
                postcard={
                    <EditableFile
                        value={postcard.value}
                        onChange={postcard.onChange}
                        placeholder={t("eventDetailsPostcardPlaceholder")}
                    />
                }
                description={<>
                    <EditableMarkdown
                        value={description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        placeholder={t("eventDetailsDescriptionPlaceholder")}
                    />
                </>}
                daterange={<></>}
            />
        </EditingContext.Provider>
    </>
}