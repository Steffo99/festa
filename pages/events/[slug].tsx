import { NextPage, NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { default as Head } from 'next/head'
import defaultPostcard from "../../public/postcards/adi-goldstein-Hli3R6LKibo-unsplash.jpg"
import { Postcard } from '../../components/postcard/changer'
import useSWR from 'swr'
import { Event } from '@prisma/client'
import { useCallback, useState } from 'react'
import { ToolBar } from '../../components/generic/toolbar/bar'
import { ToolToggleEditing } from '../../components/events/toolbar/toolToggleEditing'
import { ToolToggleVisibility } from '../../components/postcard/toolbar/toolToggleVisibility'
import { WIPBanner } from '../../components/generic/wip/banner'
import { AuthContext } from '../../components/auth/base'
import { useDefinedContext } from '../../utils/definedContext'
import { useAxios } from '../../components/auth/requests'
import { database } from '../../utils/prismaClient'
import { EventsActionEdit } from '../../components/events/actions/edit'
import { EventsActionView } from '../../components/events/actions/view'
import { usePromise } from '../../components/generic/loading/promise'


export async function getServerSideProps(context: NextPageContext) {
    const slug = context.query.slug as string

    return {
        props: {
            slug,
            defaultData: await database.event.findUnique({ where: { slug } }),
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


type PageEventProps = {
    slug: string,
    defaultData: Event,
}


const PageEvent: NextPage<PageEventProps> = ({ slug, defaultData }) => {
    const { t } = useTranslation()
    const axios = useAxios()

    const [eventEditing, eventSetEditing] = useState<boolean>(false)
    const [data, setData] = useState<Event>(defaultData)
    const [auth,] = useDefinedContext(AuthContext)

    const save = usePromise<void, void>(useCallback(
        async () => {
            const response = await axios.patch<Event>(`/api/events/${slug}`, data!)
            setData(response.data)
        },
        [axios, data, setData, slug]
    ))

    const eventName = data?.name ?? slug
    const eventPostcard = data?.postcard || defaultPostcard
    const eventCanEdit = auth && data && auth.userId === data.creatorId

    return <>
        <Head>
            <title key="title">{eventName} - {t("siteTitle")}</title>
        </Head>
        <Postcard src={eventPostcard} />
        <WIPBanner />
        <ToolBar vertical="vadapt" horizontal="right">
            <ToolToggleVisibility />
            {eventCanEdit &&
                <ToolToggleEditing
                    editing={eventEditing}
                    setEditing={eventSetEditing}
                    save={save}
                />
            }
        </ToolBar>
        {eventEditing ?
            <EventsActionEdit data={data!} setData={setData} save={save} setEditing={eventSetEditing} />
            :
            <EventsActionView data={data!} />
        }
    </>
}


export default PageEvent
