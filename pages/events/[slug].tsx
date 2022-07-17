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
import { useCallback, useContext, useState } from 'react'
import { ToolBar } from '../../components/generic/toolbar/bar'
import { ToolToggleEditing } from '../../components/events/toolbar/toolToggleEditing'
import { ToolToggleVisibility } from '../../components/postcard/toolbar/toolToggleVisibility'
import { WIPBanner } from '../../components/generic/wip/banner'
import { AuthContext } from '../../components/auth/base'
import { useDefinedContext } from '../../utils/definedContext'
import { ViewContent } from '../../components/generic/views/content'
import { useAxios } from '../../components/auth/requests'


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
    const { data, mutate } = useSWR<Event>(`/api/events/${slug}`)
    const [auth, _setAuth] = useDefinedContext(AuthContext)
    const axios = useAxios()

    const save = useCallback(
        async () => {
            await axios.patch(`/api/events/${slug}`, data)
            mutate(data)
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
        <EditingContext.Provider value={useState<EditingMode>(EditingMode.VIEW)}>
            <ViewContent
                title={
                    <EditableText
                        value={data?.name ?? slug}
                        onChange={e => mutate(async state => state ? { ...state, name: e.target.value } : undefined, { revalidate: false })}
                    />
                }
                content={
                    <EditableMarkdown
                        value={data?.description ?? ""}
                        onChange={e => mutate(async state => state ? { ...state, description: e.target.value } : undefined, { revalidate: false })}
                    />
                }
            />
            <ToolBar vertical="vadapt" horizontal="right">
                <ToolToggleVisibility />
                {data && auth?.userId === data?.creatorId &&
                    <ToolToggleEditing
                        onEditEnd={save}
                    />
                }
            </ToolBar>
        </EditingContext.Provider>
    </>
}


export default PageEvent
