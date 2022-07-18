import { NextPage, NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { default as Head } from 'next/head'
import defaultPostcard from "../../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { Postcard } from '../../components/postcard/changer'
import useSWR from 'swr'
import { Event } from '@prisma/client'
import { EditableMarkdown, EditableText } from '../../components/generic/editable/inputs'
import { EditingContext, EditingMode } from '../../components/generic/editable/base'
import { useCallback, useState } from 'react'
import { ToolBar } from '../../components/generic/toolbar/bar'
import { ToolToggleEditing } from '../../components/events/toolbar/toolToggleEditing'
import { ToolToggleVisibility } from '../../components/postcard/toolbar/toolToggleVisibility'
import { WIPBanner } from '../../components/generic/wip/banner'
import { AuthContext } from '../../components/auth/base'
import { useDefinedContext } from '../../utils/definedContext'
import { ViewContent } from '../../components/generic/views/content'
import { useAxios } from '../../components/auth/requests'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { FestaIcon } from '../../components/generic/renderers/fontawesome'
import { usePromise, UsePromiseStatus } from '../../components/generic/loading/promise'
import { EditingContextProvider } from '../../components/generic/editable/provider'


export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            slug: context.query.slug,
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


type PageEventProps = {
    slug: string
}


const PageEvent: NextPage<PageEventProps> = ({ slug }) => {
    const { t } = useTranslation()
    const { data, isValidating, mutate } = useSWR<Event>(`/api/events/${slug}`)
    const [auth,] = useDefinedContext(AuthContext)
    const axios = useAxios()

    const save = useCallback(
        async () => {
            if (data === undefined) {
                console.warn("[PageEvent] Tried to save while no data was available.")
                return
            }

            await axios.patch(`/api/events/${slug}`, data)
            mutate(data)
            console.debug("[PageEvent] Saved updated data successfully!")
        },
        [axios, data]
    )

    return <>
        <Head>
            <title key="title">{data?.name ?? slug} - {t("siteTitle")}</title>
        </Head>
        <Postcard
            src={data?.postcard || defaultPostcard}
        />
        <WIPBanner />
        <EditingContextProvider>
            <ViewContent
                title={
                    <EditableText
                        value={data?.name ?? slug}
                        onChange={e => mutate(async state => state ? { ...state, name: e.target.value } : undefined, { revalidate: false })}
                        placeholder={t("eventTitlePlaceholder")}
                    />
                }
                content={
                    <EditableMarkdown
                        value={data?.description ?? ""}
                        onChange={e => mutate(async state => state ? { ...state, description: e.target.value } : undefined, { revalidate: false })}
                        placeholder={t("eventDescriptionPlaceholder")}
                    />
                }
            />
            <ToolBar vertical="vadapt" horizontal="right">
                <ToolToggleVisibility />
                {data && auth?.userId === data?.creatorId &&
                    <ToolToggleEditing
                        save={save}
                    />
                }
            </ToolBar>
        </EditingContextProvider>
    </>
}


export default PageEvent
