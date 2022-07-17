import { NextPage, NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { default as Head } from 'next/head'
import defaultPostcard from "../../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { Postcard } from '../../components/postcard/changer'
import { ViewEvent } from '../../components/events/views/event'
import useSWR from 'swr'
import { Event } from '@prisma/client'
import { EditableText } from '../../components/generic/editable/inputs'
import { EditingContext, EditingMode } from '../../components/generic/editable/base'
import { useCallback, useContext, useState } from 'react'
import { ToolBar } from '../../components/generic/toolbar/bar'
import { ToolToggleEditing } from '../../components/events/toolbar/toolToggleEditing'
import { ToolToggleVisibility } from '../../components/postcard/toolbar/toolToggleVisibility'
import { WIPBanner } from '../../components/generic/wip/banner'
import { AuthContext } from '../../components/auth/base'
import { useDefinedContext } from '../../utils/definedContext'
import { asleep } from '../../utils/asleep'


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
    const { data, error, mutate } = useSWR<Event>(`/api/events/${slug}`)
    const [auth, _setAuth] = useDefinedContext(AuthContext)

    const displayTitle = data?.name ?? slug
    const displayPostcard = data?.postcard ?? defaultPostcard
    const displayDescription = data?.description ?? ""

    const saveEdits = useCallback(
        async () => {
            await asleep(1000)
            mutate()
        },
        []
    )


    return <>
        <Head>
            <title key="title">{displayTitle} - {t("siteTitle")}</title>
            <link rel="preload" href={`/api/events/${slug}`} as="fetch" />
        </Head>
        <Postcard
            src={displayPostcard}
        />
        <WIPBanner />
        <EditingContext.Provider value={useState<EditingMode>(EditingMode.VIEW)}>
            <ViewEvent
                title={<>
                    <EditableText
                        value={displayTitle}
                        onChange={e => mutate(async state => state ? { ...state, name: e.target.value } : undefined, { revalidate: false })}
                    />
                </>}
                postcard={<></>}
                description={<>
                    <EditableText
                        value={displayDescription}
                        onChange={e => mutate(async state => state ? { ...state, description: e.target.value } : undefined, { revalidate: false })}
                    />
                </>}
                daterange={<></>}
            />
            <ToolBar vertical="vadapt" horizontal="right">
                <ToolToggleVisibility />
                {data && auth?.userId === data?.creatorId &&
                    <ToolToggleEditing
                        onEditEnd={saveEdits}
                    />
                }
            </ToolBar>
        </EditingContext.Provider>
    </>
}


export default PageEvent
