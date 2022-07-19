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
import { promiseMultiplexer, usePromise, UsePromiseStatus } from '../../components/generic/loading/promise'
import { EditingContextProvider } from '../../components/generic/editable/provider'
import { swrMultiplexer } from '../../components/generic/loading/swr'
import { LoadingMain, LoadingInline } from '../../components/generic/loading/renderers'
import { ViewNotice } from '../../components/generic/views/notice'
import { ErrorBlock } from '../../components/generic/errors/renderers'
import { database } from '../../utils/prismaClient'


export async function getServerSideProps(context: NextPageContext) {
    const slug = context.query.slug as string

    return {
        props: {
            slug,
            event: await database.event.findUnique({ where: { slug } }),
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


type PageEventProps = {
    slug: string,
    event: Event,
}


const PageEvent: NextPage<PageEventProps> = ({ slug, event }) => {
    const { t } = useTranslation()
    const swrHook = useSWR<Event>(`/api/events/${slug}`, { fallback: event })
    const [auth,] = useDefinedContext(AuthContext)
    const axios = useAxios()

    const save = useCallback(
        async () => {
            if (swrHook.data === undefined) {
                console.warn("[PageEvent] Tried to save while no data was available.")
                return
            }

            await axios.patch(`/api/events/${slug}`, swrHook.data)
            swrHook.mutate(swrHook.data)
            console.debug("[PageEvent] Saved updated data successfully!")
        },
        [axios, swrHook]
    )

    return <>
        <Head>
            <title key="title">{swrHook.data?.name ?? slug} - {t("siteTitle")}</title>
        </Head>
        <Postcard
            src={swrHook.data?.postcard || defaultPostcard}
        />
        <WIPBanner />
        <EditingContextProvider>
            {swrMultiplexer({
                hook: swrHook,
                loading: () => (
                    <ViewNotice
                        notice={
                            <LoadingMain text={t("eventLoading")} />
                        }
                    />
                ),
                ready: (data) => (
                    <ViewContent
                        title={
                            <EditableText
                                value={data?.name ?? slug}
                                onChange={e => swrHook.mutate(async state => state ? { ...state, name: e.target.value } : undefined, { revalidate: false })}
                                placeholder={t("eventTitlePlaceholder")}
                            />
                        }
                        content={
                            <EditableMarkdown
                                value={data?.description ?? ""}
                                onChange={e => swrHook.mutate(async state => state ? { ...state, description: e.target.value } : undefined, { revalidate: false })}
                                placeholder={t("eventDescriptionPlaceholder")}
                            />
                        }
                    />
                ),
                error: (error) => (
                    <ViewNotice
                        notice={
                            <ErrorBlock
                                text={t("eventError")}
                                error={error}
                            />
                        }
                    />
                )
            })}

            <ToolBar vertical="vadapt" horizontal="right">
                <ToolToggleVisibility />
                {swrHook.data && auth?.userId === swrHook.data?.creatorId &&
                    <ToolToggleEditing
                        save={save}
                    />
                }
            </ToolBar>
        </EditingContextProvider>
    </>
}


export default PageEvent
