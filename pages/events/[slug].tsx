import { Event, User } from "@prisma/client";
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useState } from "react";
import { ToolBar } from "../../components/tools/ToolBar";
import { EditableMarkdown } from "../../components/editable/EditableMarkdown";
import { EditableText } from "../../components/editable/EditableText";
import { ToolToggleEditing } from "../../components/tools/ToolToggleEditing";
import { EditingContext } from "../../contexts/editing";
import { database } from "../../utils/prismaClient";
import { Postcard } from "../../components/postcard/Postcard";
import { ViewContent } from "../../components/view/ViewContent";


export async function getServerSideProps(context: NextPageContext) {
    const slug = context.query.slug as string
    if(typeof slug === "object") {
        return {notFound: true}
    }

    const event = await database.event.findUnique({
        where: {slug},
        include: {creator: true}
    })
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
    event: Event & {creator: User}
}


export default function PageEventDetail({event}: PageEventDetailProps) {
    const {t} = useTranslation()
    const editState = useState<boolean>(false)
    const [description, setDescription] = useState<string>("")

    return <>
        <Head>
            <title key="title">{event.name} - {t("siteTitle")}</title>
        </Head>
        <Postcard 
            src={event.postcard ?? undefined}
        />
        <EditingContext.Provider value={editState}>
            <ToolBar vertical="top" horizontal="right">
                <ToolToggleEditing/>
            </ToolBar>
            <ViewContent
                title={
                    <EditableText value={event.name}/>
                }
                content={<>
                    <EditableMarkdown 
                        value={description} 
                        onChange={e => setDescription((e.target as HTMLTextAreaElement).value)}
                    />
                </>}
            />
        </EditingContext.Provider>
    </>
}